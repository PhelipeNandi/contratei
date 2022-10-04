import { createContext, useEffect, useState } from "react";

import { Provider } from "../types/provider";
import { useAuthContext } from "../hooks/useAuthContext";

import { searchProviderById } from "../features/searchProvider";
import { isNewCommentAbleForConsumer } from "../features/commentsProvider";

interface ProviderContextType {
    provider: Provider | null;
    searchProvider: (idProvider: number) => Promise<void>;
    isNewCommentDisable: boolean;
}

export const ProviderContext = createContext({} as ProviderContextType);

export function ProviderProvider({ children }) {
    const [provider, setProvider] = useState<Provider | null>();
    const { user, isAuthenticated } = useAuthContext();
    const [isNewCommentDisable, setNewCommentDisable] = useState<boolean>(false);

    useEffect(() => {
        async function isNewCommentAbleForConsumerRequest() {
            if (user.type === "Consumidor" && provider != null) {
                await isNewCommentAbleForConsumer(user.id, provider.id)
                    .then((response) => {
                        if (response === true) {
                            setNewCommentDisable(true);
                        }
                    })
                    .catch((error) => {
                        if (error instanceof Error) {
                            console.log(error);
                        }
                    });
            }
        }

        isNewCommentAbleForConsumerRequest();
    }, [provider]);

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
        <ProviderContext.Provider value={{ provider, searchProvider, isNewCommentDisable }}>
            {children}
        </ProviderContext.Provider>
    );
}