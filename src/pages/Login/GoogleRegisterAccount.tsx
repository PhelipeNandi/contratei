import { VStack } from 'native-base';
import { useEffect } from 'react';
import { Header } from '../../components/ui/Header';
import { useAuthContext } from '../../hooks/useAuthContext';

export function GoogleRegisterAccount() {
    const { googleUser } = useAuthContext();

    useEffect(() => {
        console.log(googleUser);
    }, []);

    return (
        <VStack flex={1} bg="background">
            <Header title="Informações Adicionais" />

        </VStack>
    );
}