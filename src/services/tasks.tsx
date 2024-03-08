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

const tasksCollectionRef = collection(db, "tasks");

class TaskDataService {
  addTask = (newTask: any) => {
    return addDoc(tasksCollectionRef, newTask);
  };

  updateTask = (id: string, updateTask: any) => {
    const taskDoc = doc(db, "tasks", id);
    return updateDoc(taskDoc, updateTask);
  };

  deleteTask = (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    return deleteDoc(taskDoc);
  };

  getAllTasks = () => {
    return getDocs(tasksCollectionRef);
  };

  getTask = (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    return getDoc(taskDoc);
  };
}

export default new TaskDataService();
