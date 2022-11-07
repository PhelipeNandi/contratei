import { useContext } from "react";
import { CreditCardContext } from "../contexts/creditCardContex";

export function useCreditCardContext() {
    const context = useContext(CreditCardContext);
    return context;
}