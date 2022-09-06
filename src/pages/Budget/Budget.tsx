import { VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/ui/Header';
import { useEffect } from 'react';

export function Budget() {
    const { params } = useRoute();

    useEffect(() => {
        console.log(params.idBudget);
    }, []);

    return (
        <VStack flex={1} justifyContent="center">
            <Header title="Budget Select" />

            <VStack flex={1} bg="background">


            </VStack>

        </VStack>
    );
}