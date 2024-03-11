import { db } from "../lib/firebase/config";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const annoncesCollectionRef = collection(db, "annonces");
class ActualiteDataService {
  addActualite = (newAnnonce: any) => {
    return addDoc(annoncesCollectionRef, newAnnonce);
  };

  updateActualite = (id: string, updateAnnonce: any) => {
    const bookDoc = doc(db, "annonces", id);
    return updateDoc(bookDoc, updateAnnonce);
  };

  deleteActualite = (id: string) => {
    const bookDoc = doc(db, "annonces", id);
    return deleteDoc(bookDoc);
  };

  getAllActualites = () => {
    return getDocs(annoncesCollectionRef);
  };

  getActualite = (id: string) => {
    const bookDoc = doc(db, "annonces", id);
    return getDoc(bookDoc);
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ActualiteDataService();