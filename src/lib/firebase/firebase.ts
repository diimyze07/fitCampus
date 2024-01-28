import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPJAUit2V4OEUSghV8lVC1ri4TT3mZ6QE",
  authDomain: "hackthonproject-2d0c9.firebaseapp.com",
  projectId: "hackthonproject-2d0c9",
  storageBucket: "hackthonproject-2d0c9.appspot.com",
  messagingSenderId: "325042923981",
  appId: "1:325042923981:web:6f695f9e55f6addd2a3c84",
  measurementId: "G-3EG9YVZNH5",
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(firebaseApp);
