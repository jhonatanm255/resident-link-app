
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Updated Firebase configuration with new credentials
const firebaseConfig = {
  apiKey: "AIzaSyA2tLy-veQdIeFqoCFTh-4dGWItrEjw5Vo",
  authDomain: "resident-4d198.firebaseapp.com",
  projectId: "resident-4d198",
  storageBucket: "resident-4d198.appspot.com",
  messagingSenderId: "596746768855",
  appId: "1:596746768855:web:8f255f707f2ae3b2c77b92",
  measurementId: "G-H0MGSC2QH7"
};

console.log("Inicializando Firebase con configuración:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configurar el proveedor de Google con parámetros adicionales
googleProvider.addScope('email');
googleProvider.addScope('profile');

console.log("Firebase Auth inicializado:", auth);
console.log("Google Provider configurado:", googleProvider);

// Firestore
export const db = getFirestore(app);

export default app;
