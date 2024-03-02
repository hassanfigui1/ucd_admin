// utils/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace this with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtg-5zWU_hUmlbGo7ZYXWvdPWprRUb3go",
  authDomain: "ucdfs-ff4f7.firebaseapp.com",
  databaseURL: "https://ucdfs-ff4f7-default-rtdb.firebaseio.com",
  projectId: "ucdfs-ff4f7",
  storageBucket: "ucdfs-ff4f7.appspot.com",
  messagingSenderId: "559020565198",
  appId: "1:559020565198:web:9d4268f49e897ff19fa69f",
  measurementId: "G-ZEJRMFYCG0"
};// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

