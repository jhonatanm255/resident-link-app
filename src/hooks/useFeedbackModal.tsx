
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useFeedbackModal = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Versión temporal para pruebas - muestra el modal después de 10 segundos
    const timer = setTimeout(() => {
      if (currentUser) {
        setShowFeedbackModal(true);
      }
    }, 10000);

    return () => clearTimeout(timer);

    /* Código original - comentado temporalmente
    const checkFeedbackEligibility = async () => {
      if (!currentUser) return;

      try {
        const userSettingsDoc = await getDoc(doc(db, "userSettings", currentUser.uid));
        const userSettings = userSettingsDoc.data();

        if (userSettings?.feedbackSubmitted) {
          return;
        }

        if (!userSettings?.firstLoginAt) {
          await setDoc(doc(db, "userSettings", currentUser.uid), {
            firstLoginAt: Timestamp.now(),
          }, { merge: true });
          return;
        }

        const firstLoginDate = userSettings.firstLoginAt.toDate();
        const daysSinceFirstLogin = Math.floor((new Date().getTime() - firstLoginDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysSinceFirstLogin >= 2) {
          const lastPromptDate = userSettings?.lastFeedbackPromptAt?.toDate();
          if (!lastPromptDate || (new Date().getTime() - lastPromptDate.getTime()) > (24 * 60 * 60 * 1000)) {
            setShowFeedbackModal(true);
            
            await setDoc(doc(db, "userSettings", currentUser.uid), {
              lastFeedbackPromptAt: Timestamp.now(),
            }, { merge: true });
          }
        }
      } catch (error) {
        console.error("Error al verificar elegibilidad para feedback:", error);
      }
    };

    const timer = setTimeout(() => {
      checkFeedbackEligibility();
    }, 2000);

    return () => clearTimeout(timer);
    */
  }, [currentUser]);

  return {
    showFeedbackModal,
    setShowFeedbackModal,
  };
};

