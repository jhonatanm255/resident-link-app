
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const useFeedbackModal = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentUser) {
        setShowFeedbackModal(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentUser]);

  return {
    showFeedbackModal,
    setShowFeedbackModal,
  };
};

