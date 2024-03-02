import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getFirestore from '../config';
const auth = getAuth(getFirestore);

export default async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}