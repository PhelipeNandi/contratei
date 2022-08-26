import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/ui/Header';

export function Notifications() {
    const navigation = useNavigation();

    return (
        <VStack flex={1}>

            <Header title="Notificações" />

            <VStack flex={1} px={8} bg="background">


            </VStack>

        </VStack>
    );
}