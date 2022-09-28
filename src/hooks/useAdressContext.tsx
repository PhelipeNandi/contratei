import { useContext } from "react";
import { AdressContext } from "../contexts/adressContext";

export function useAdressContext() {
    const context = useContext(AdressContext);
    return context;
}