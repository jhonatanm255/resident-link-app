
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useFeedbackModal = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkFeedbackEligibility = async () => {
      if (!currentUser) return;

      try {
        // Verificar si el usuario ya ha proporcionado feedback
        const userSettingsDoc = await getDoc(doc(db, "userSettings", currentUser.uid));
        const userSettings = userSettingsDoc.data();

        // Si ya ha enviado feedback, no mostrar el modal
        if (userSettings?.feedbackSubmitted) {
          return;
        }

        // Verificar cuándo fue el primer inicio de sesión
        if (!userSettings?.firstLoginAt) {
          // Si es la primera vez, registrar la fecha
          await setDoc(doc(db, "userSettings", currentUser.uid), {
            firstLoginAt: Timestamp.now(),
          }, { merge: true });
          return;
        }

        // Calcular los días desde el primer inicio de sesión
        const firstLoginDate = userSettings.firstLoginAt.toDate();
        const daysSinceFirstLogin = Math.floor((new Date().getTime() - firstLoginDate.getTime()) / (1000 * 60 * 60 * 24));

        // Mostrar el modal después de 2-3 días (usamos 2 días)
        if (daysSinceFirstLogin >= 2) {
          // Verificar si han pasado al menos 24 horas desde la última vez que se mostró
          const lastPromptDate = userSettings?.lastFeedbackPromptAt?.toDate();
          if (!lastPromptDate || (new Date().getTime() - lastPromptDate.getTime()) > (24 * 60 * 60 * 1000)) {
            setShowFeedbackModal(true);
            
            // Actualizar la última fecha de visualización
            await setDoc(doc(db, "userSettings", currentUser.uid), {
              lastFeedbackPromptAt: Timestamp.now(),
            }, { merge: true });
          }
        }
      } catch (error) {
        console.error("Error al verificar elegibilidad para feedback:", error);
      }
    };

    // Verificar después de que la página haya cargado completamente
    const timer = setTimeout(() => {
      checkFeedbackEligibility();
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentUser]);

  return {
    showFeedbackModal,
    setShowFeedbackModal,
  };
};
