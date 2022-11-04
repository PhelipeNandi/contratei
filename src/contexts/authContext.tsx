import { createContext, useState, useEffect } from "react";
import { useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Api } from "../lib/Api";
import { User } from "../types/user";
import { GoogleUser, SignInData } from "../types/authentication";
import { signInRequest, signInGoogleRequest, authenticateGoogleAccount, findUserGoogleAccount } from "../features/authentication";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    isConsumer: boolean;
    user: User | null;
    googleUser: GoogleUser | null;
    signIn: (data: SignInData) => Promise<void>;
    signInGoogle(): Promise<string | void>;
    logOut(): void;
    changePersonalInformationUser(dataUser: User): void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>();
    const [googleUser, setGoogleUser] = useState<GoogleUser | null>();
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

    async function signInGoogle(): Promise<string | void> {
        await signInGoogleRequest()
            .then((googleUser) => {
                console.log("1");
                setGoogleUser(googleUser);
                authenticateGoogleAccount({ email: googleUser.email, password: googleUser.password })
                    .then((response) => {
                        console.log("2");
                        if (response === "Usuário não encontrado") return response;

                        findUserGoogleAccount(googleUser.email, response)
                            .then((user) => {
                                setUser(user);
                                setIsConsumer(user.type === "Consumidor");
                                AsyncStorage.setItem('@contratei:user', JSON.stringify(user));
                                queryClient.invalidateQueries();
                            });
                    })
            });
    }

    function logOut() {
        AsyncStorage.removeItem('@contratei:user')
            .then(() => {
                setUser(null);
                setIsConsumer(null);
                queryClient.invalidateQueries();
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
        <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, isConsumer, user, googleUser, signIn, signInGoogle, logOut, changePersonalInformationUser }}>
            {children}
        </AuthContext.Provider>
    );
}