import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { onAuthStateChanged, signOut } from "@firebase/auth"
import { doc, getDoc } from "@firebase/firestore"
import { auth, db } from "../utils/firebase"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null);
    const [channel, setChannel] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [loading, setLoading] = useState(false)


    useEffect(() =>
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setLoadingInitial(false)
        }),
        []
    );

    const logout = async () => {
        setLoading(true)

        signOut(auth)
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    };

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            logout,
            channel,
            setChannel
        }),
        [user, loading, error]
    );


    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );

};

export default function useAuth() {
    return useContext(AuthContext)
}