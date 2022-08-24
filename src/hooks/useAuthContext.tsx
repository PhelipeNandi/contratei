import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function useAuthContext() {
    const context = useContext(AuthContext);
    return context;
}