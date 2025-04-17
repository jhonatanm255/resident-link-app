
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase con credenciales de ejemplo
// IMPORTANTE: En una aplicación de producción, deberías reemplazar estas credenciales con las tuyas propias
const firebaseConfig = {
  apiKey: "AIzaSyC4lINGKhBQbVjfXMAShTt_jnCXAWiIMKo",
  authDomain: "residentlink-demo.firebaseapp.com",
  projectId: "residentlink-demo",
  storageBucket: "residentlink-demo.appspot.com",
  messagingSenderId: "789234567890",
  appId: "1:789234567890:web:1234567890abcdef123456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);

export default app;
