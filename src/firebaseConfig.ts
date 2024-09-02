import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Verifica se a variável de ambiente está definida
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error("A variável de ambiente NEXT_PUBLIC_FIREBASE_API_KEY não está definida.");
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
