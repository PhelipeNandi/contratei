import { useContext } from "react";
import { BudgetContext } from "../contexts/budgetContext";

export function useBudgetContext() {
    const context = useContext(BudgetContext);
    return context;
}