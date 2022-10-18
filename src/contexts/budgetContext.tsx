import { createContext, useState } from "react";
import { getBudgetById } from "../features/budget";
import { Budget } from "../types/budget";

interface BudgetContextType {
    budget: Budget | null;
    searchBudget: (idBudget: number) => Promise<void>;
}

export const BudgetContext = createContext({} as BudgetContextType);

export function BudgetProvider({ children }) {
    const [budget, setBudget] = useState<Budget | null>();

    async function searchBudget(idBudget: number) {
        await getBudgetById(idBudget)
            .then(budget => {
                setBudget(budget);
            })
            .catch(error => {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            });
    }

    return (
        <BudgetContext.Provider value={{ budget, searchBudget }}>
            {children}
        </BudgetContext.Provider>
    )
}