import { createContext, useState } from "react";

import { Provider } from "../types/provider";
import { searchProviderById } from "../features/searchProvider";
import { useAuthContext } from "../hooks/useAuthContext";

interface ProviderContextType {
    provider: Provider | null;
    searchProvider: (idProvider: number) => Promise<void>;
}

export const ProviderContext = createContext({} as ProviderContextType);

export function ProviderProvider({ children }) {
    const [provider, setProvider] = useState<Provider | null>();
    const { isAuthenticated } = useAuthContext();

    async function searchProvider(idProvider: number) {
        await searchProviderById(idProvider, isAuthenticated)
            .then(provider => {
                setProvider(provider);
            })
            .catch(error => {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            });
    }

    return (
        <ProviderContext.Provider value={{ provider, searchProvider }}>
            {children}
        </ProviderContext.Provider>
    );
}