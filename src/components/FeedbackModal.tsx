
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onOpenChange }) => {
  const { currentUser } = useAuth();

  const handleFeedback = async (liked: boolean) => {
    if (!currentUser) return;
    
    try {
      // Guardar el feedback en una colección separada
      await setDoc(doc(db, "userFeedback", currentUser.uid), {
        liked,
        userId: currentUser.uid,
        email: currentUser.email,
        timestamp: Timestamp.now(),
      });
      
      // También actualizar el documento de usuario para que no vuelva a mostrar el modal
      await setDoc(doc(db, "userSettings", currentUser.uid), {
        feedbackSubmitted: true,
        feedbackSubmittedAt: Timestamp.now(),
      }, { merge: true });
      
      toast.success("¡Gracias por tu feedback!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error al guardar el feedback:", error);
      toast.error("No se pudo guardar tu feedback. Inténtalo más tarde.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">¿Te gusta la app y sería útil en tu trabajo?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-8 py-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleFeedback(true)}
            className="flex flex-col items-center p-6 hover:bg-green-50 hover:border-green-200"
          >
            <ThumbsUp className="h-12 w-12 text-green-600" />
            <span className="mt-2">Me gusta</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleFeedback(false)}
            className="flex flex-col items-center p-6 hover:bg-red-50 hover:border-red-200"
          >
            <ThumbsDown className="h-12 w-12 text-red-600" />
            <span className="mt-2">No me gusta</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
