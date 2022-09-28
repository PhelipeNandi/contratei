import { createContext, useState } from "react";

import { UserAddress } from "../types/user";

interface AddressContextType {
    address: UserAddress | null;
    setAddress: (address: UserAddress) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export const AddressContext = createContext({} as AddressContextType);

export function AddressProvider({ children }) {
    const [address, setAddress] = useState<UserAddress | null>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <AddressContext.Provider value={{ address, setAddress, isEditing, setIsEditing, isModalOpen, setIsModalOpen }}>
            {children}
        </AddressContext.Provider>
    );
}