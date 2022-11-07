import { createContext, useState } from "react";

import { CreditCard } from "../types/user";

interface CreditCardContextType {
    creditCard: CreditCard | null;
    setCreditCard: (creditCard: CreditCard) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
}

export const CreditCardContext = createContext({} as CreditCardContextType);

export function CreditCardProvider({ children }) {
    const [creditCard, setCreditCard] = useState<CreditCard | null>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <CreditCardContext.Provider value={{
            creditCard,
            setCreditCard,
            isEditing,
            setIsEditing
        }}>
            {children}
        </CreditCardContext.Provider>
    );
}