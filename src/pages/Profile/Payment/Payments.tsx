import { ScrollView, VStack, Text, useTheme, Link, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { propsStack } from '../../../routes/Navigators/Models';

import { Header } from '../../../components/ui/Header';
import { CreditCard } from '../../../components/ui/CreditCard';
import { CardCreditCard } from '../../../features/payments';
import { Button } from '../../../components/ui/Button';

export function Payments() {
    const navigation = useNavigation<propsStack>();

    function handleNavigateAddNewCreditCard() {
        navigation.navigate('addNewCreditCard');
    }

    return (
        <VStack flex={1}>

            <Header title="Pagamentos" />

            <ScrollView bg="background">

                <VStack flex={1} px={5}>

                    <CreditCard mt={10} />

                    <Text mt={5} fontFamily="body" fontSize="sm" color="primary.700">
                        Formas de Pagamento
                    </Text>

                    <CardCreditCard />

                    <CardCreditCard />

                    <CardCreditCard />

                    <CardCreditCard />

                    <Button
                        mt={5}
                        title="Novo cartão de crédito"
                        variant="primary"
                        onPress={handleNavigateAddNewCreditCard}
                    />

                </VStack >

            </ScrollView >

        </VStack>
    );
}