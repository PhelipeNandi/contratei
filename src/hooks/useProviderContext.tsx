import { useContext } from "react";
import { ProviderContext } from "../contexts/providerContext";

export function useProviderContext() {
    const context = useContext(ProviderContext);
    return context;
}