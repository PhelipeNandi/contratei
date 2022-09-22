import { VStack } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from '../../components/ui/Header';
import { useEffect } from 'react';
import { propsNavigationStack } from '../../routes/Navigators/Models';

export function Budget() {
    const route = useRoute<RouteProp<propsNavigationStack, "budget">>();

    useEffect(() => {
        console.log(route.params?.idBudget);
    }, []);

    return (
        <VStack flex={1} justifyContent="center">
            <Header title="Budget Select" />

            <VStack flex={1} bg="background">


            </VStack>

        </VStack>
    );
}