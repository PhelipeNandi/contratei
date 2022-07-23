import { createContext, useState, useEffect } from "react";
import { Api, signInRequest } from "../services/Api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    token: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User;
    signIn: (data: SignInData) => Promise<void>;
    logOut(): void;
}

interface SignInData {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@contratei:user');

            if (storageUser) {
                Api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                setUser(JSON.parse(storageUser));
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn({ email, password }: SignInData) {
        const user = await signInRequest({
            email,
            password
        });

        setUser(user);

        Api.defaults.headers['Authorization'] = `Bearer ${user.token}`;

        await AsyncStorage.setItem('@contratei:user', JSON.stringify(user));
    }

    function logOut() {
        AsyncStorage.removeItem('@contratei:user').then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, user, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}