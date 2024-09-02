// Importar as funções que você precisa dos SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAcN5leh454y4dDRab9HR9E8CHw0N9zdFE",
  authDomain: "chamadaqrcode.firebaseapp.com",
  projectId: "chamadaqrcode",
  storageBucket: "chamadaqrcode.appspot.com",
  messagingSenderId: "902166658149",
  appId: "1:902166658149:web:8c9f66ecf485deb18f1a8c"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
