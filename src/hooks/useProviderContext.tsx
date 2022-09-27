import { useContext } from "react";
import { ProviderContext } from "../contexts/authProvider";

export function useProviderContext() {
    const context = useContext(ProviderContext);
    return context;
}