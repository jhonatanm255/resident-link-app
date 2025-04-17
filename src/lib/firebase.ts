
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (reemplazar con tus propias credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyDRjW84N9c1buwMxz_cQ7-hVR0XrAzGRGY",
  authDomain: "resident-link-app.firebaseapp.com",
  projectId: "resident-link-app",
  storageBucket: "resident-link-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);

export default app;
