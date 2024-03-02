import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import getFirestore from "../config";

const auth = getAuth(getFirestore);


export default async function signUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}