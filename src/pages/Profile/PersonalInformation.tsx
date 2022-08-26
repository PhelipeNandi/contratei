import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/ui/Header';

export function PersonalInformation() {
    const navigation = useNavigation();

    return (
        <VStack flex={1}>

            <Header title="Informações Pessoais" />

            <VStack flex={1} px={8} bg="background">


            </VStack>

        </VStack>
    );
}