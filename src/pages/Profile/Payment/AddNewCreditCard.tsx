import { VStack, HStack, Box, Text, Icon, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { User, DotsThree, CalendarBlank, Lock } from 'phosphor-react-native';

import { Header } from '../../../components/ui/Header';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/ui/Button';
import { CreditCard } from '../../../components/ui/CreditCard';

export function AddNewCreditCard() {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <VStack flex={1}>

            <Header title="Pagamentos" />

            <VStack flex={1} px={8} bg="background">

                <CreditCard mt={10} />

                <Input
                    mt={5}
                    placeholder="Nome do titular"
                    InputLeftElement={<Icon as={<User color={colors.secondary[700]} />} ml={4} />}
                />

                <Input
                    mt={5}
                    placeholder="Número do cartão"
                    keyboardType="numeric"
                    InputLeftElement={<Icon as={<DotsThree color={colors.secondary[700]} />} ml={4} />}
                />

                <HStack mt={6} justifyContent="space-between">
                    <Box flex={1}>
                        <Input
                            placeholder="Validade"
                            InputLeftElement={<Icon as={<CalendarBlank color={colors.secondary[700]} />} ml={4} />}
                        />
                    </Box>

                    <Box flex={1} pl={2}>
                        <Input
                            placeholder="CVV"
                            keyboardType="numeric"
                            InputLeftElement={<Icon as={<Lock color={colors.secondary[700]} />} ml={4} />}
                        />
                    </Box>
                </HStack>

                <Button
                    mt={8}
                    title="Cadastrar"
                    variant="sucess"
                />

            </VStack >

        </VStack >
    );
}