import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtg-5zWU_hUmlbGo7ZYXWvdPWprRUb3go",
  authDomain: "ucdfs-ff4f7.firebaseapp.com",
  databaseURL: "https://ucdfs-ff4f7-default-rtdb.firebaseio.com",
  projectId: "ucdfs-ff4f7",
  storageBucket: "ucdfs-ff4f7.appspot.com",
  messagingSenderId: "559020565198",
  appId: "1:559020565198:web:9d4268f49e897ff19fa69f",
  measurementId: "G-ZEJRMFYCG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();