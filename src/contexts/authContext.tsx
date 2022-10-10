import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from 'react-query';

import { Api } from "../lib/Api";
import { signInRequest, signInGoogleRequest } from "../features/authentication";
import { User } from "../types/user";
import { SignInData } from "../types/authentication";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    isConsumer: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>;
    signInGoogle(): void;
    logOut(): void;
    changePersonalInformationUser(dataUser: User): void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>();
    const [isLoading, setLoading] = useState(true);
    const [isConsumer, setIsConsumer] = useState<boolean | null>();

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@contratei:user');

            if (storageUser) {
                const userJson: User = JSON.parse(storageUser);
                setUser(userJson);
                setIsConsumer(userJson.type === "Consumidor");
                Api.defaults.headers['Authorization'] = `Bearer ${userJson.token}`;
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(data: SignInData) {
        await signInRequest(data)
            .then((user) => {
                setUser(user);
                setIsConsumer(user.type === "Consumidor");
                AsyncStorage.setItem('@contratei:user', JSON.stringify(user));
                queryClient.invalidateQueries();
            })
            .catch((error) => {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            });
    }

    async function signInGoogle() {
        await signInGoogleRequest();
    }

    function logOut() {
        AsyncStorage.removeItem('@contratei:user')
            .then(() => {
                setUser(null);
                setIsConsumer(null);
                delete Api.defaults.headers['Authorization'];
            });
    }

    function changePersonalInformationUser(dataUser: User) {
        if (dataUser) {
            setUser(dataUser);
            AsyncStorage.removeItem('@contratei:user');
            AsyncStorage.setItem('@contratei:user', JSON.stringify(dataUser));
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, isConsumer, user, signIn, signInGoogle, logOut, changePersonalInformationUser }}>
            {children}
        </AuthContext.Provider>
    );
}