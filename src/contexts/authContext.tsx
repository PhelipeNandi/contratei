import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Api } from "../lib/Api";
import { signInRequest, signInGoogleRequest } from "../features/authentication";
import { User, SignInData } from "../types/user";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>;
    signInGoogle(): void;
    logOut(): void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@contratei:user');

            if (storageUser) {
                const userJson: User = JSON.parse(storageUser);
                setUser(userJson);
                Api.defaults.headers['Authorization'] = `Bearer ${userJson.token}`;
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(data: SignInData) {
        const user = await signInRequest(data);

        setUser(user);

        await AsyncStorage.setItem('@contratei:user', JSON.stringify(user));
    }

    async function signInGoogle() {
        await signInGoogleRequest();
    }

    function logOut() {
        AsyncStorage.removeItem('@contratei:user').then(() => {
            setUser(null);
            delete Api.defaults.headers['Authorization'];
        });
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, user, signIn, signInGoogle, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}