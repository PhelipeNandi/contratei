import { useContext } from "react";
import { AddressContext } from "../contexts/adressContext";

export function useAddressContext() {
    const context = useContext(AddressContext);
    return context;
}