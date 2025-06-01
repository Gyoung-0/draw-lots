// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtiVekYckfftGnHwdry3T1-96gUcPUcV0",
  authDomain: "draw-lots-a1d4e.firebaseapp.com",
  projectId: "draw-lots-a1d4e",
  storageBucket: "draw-lots-a1d4e.firebasestorage.app",
  messagingSenderId: "69179531990",
  appId: "1:69179531990:web:60cfb861d95c3b34e5df77",
  measurementId: "G-S5T7WHENJY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Firestore 연결

export { db };