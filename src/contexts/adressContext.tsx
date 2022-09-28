import { createContext, useState } from "react";

import { UserAdress } from "../types/user";

interface AdressContextType {
    adress: UserAdress | null;
    setAdress: (adress: UserAdress) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export const AdressContext = createContext({} as AdressContextType);

export function AdressProvider({ children }) {
    const [adress, setAdress] = useState<UserAdress | null>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <AdressContext.Provider value={{ adress, setAdress, isEditing, setIsEditing, isModalOpen, setIsModalOpen }}>
            {children}
        </AdressContext.Provider>
    );
}