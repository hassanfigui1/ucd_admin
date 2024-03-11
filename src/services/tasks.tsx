import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase/config";

const eventsCollectionRef = collection(db, "tasks");

class EventDataService {
  // Ajouter un nouvel événement
  addEvent = (newEvent: any) => {
    return addDoc(eventsCollectionRef, newEvent);
  };

  // Mettre à jour un événement existant
  updateEvent = (id: string, updateEvent: any) => {
    const eventDoc = doc(db, "tasks", id);
    return updateDoc(eventDoc, updateEvent);
  };

  // Supprimer un événement
  deleteEvent = (id: string) => {
    const eventDoc = doc(db, "tasks", id);
    return deleteDoc(eventDoc);
  };

  // Obtenir tous les événements
  getAllEvents = () => {
    return getDocs(eventsCollectionRef);
  };

  // Obtenir un événement spécifique
  getEvent = (id: string) => {
    const eventDoc = doc(db, "tasks", id);
    return getDoc(eventDoc);
  };
}

export default new EventDataService();
