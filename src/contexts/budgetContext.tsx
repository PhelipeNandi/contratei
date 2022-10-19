import { createContext, useState } from "react";

interface BudgetContextType {
    showAlert: boolean,
    setShowAlert: (showAlert: boolean) => void;
}

export const BudgetContext = createContext({} as BudgetContextType);

export function BudgetProvider({ children }) {
    const [showAlert, setShowAlert] = useState<boolean | null>();

    return (
        <BudgetContext.Provider value={{ showAlert, setShowAlert }}>
            {children}
        </BudgetContext.Provider>
    )
}