import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { ReactNode, useEffect, useState } from 'react';
import getFirestore from '../lib/firebase/config';
const auth = getAuth(getFirestore);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<any>(null); 
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
