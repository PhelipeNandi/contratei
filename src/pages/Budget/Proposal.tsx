import { VStack, HStack, Text, IconButton, useTheme, ScrollView } from 'native-base';
import { WhatsappLogo } from 'phosphor-react-native';

import { ProviderBudget } from '../../types/provider';
import { useAuthContext } from '../../hooks/useAuthContext';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/form/TextArea';
import { CardProvider } from '../../features/budget';

export function Proposal() {
    const { colors } = useTheme();
    const { isConsumer } = useAuthContext();

    const provider: ProviderBudget =
    {
        id: 1,
        firstName: 'Fornecedor',
        lastName: '1',
        contactNumber: '(48) 99999-9999',
        profilePicture: null
    }

    async function handleSendWhatsappMessageProvider() {

    }

    return (
        <VStack flex={1} justifyContent="center" bg="background">

            <Header title="Proposta" />

            <ScrollView>
                <VStack flex={1} mt={5} px={8} bg="background">

                    {
                        !isConsumer &&
                        <VStack>
                            <Text mb={3} fontFamily="body" fontSize="xs" color="gray.300">
                                Fornecedor
                            </Text>

                            <HStack mb={5} justifyContent="space-between" alignItems="center">
                                <CardProvider
                                    data={provider}
                                />

                                <IconButton
                                    icon={<WhatsappLogo color={colors.green[700]} size="40" weight='fill' />}
                                    onPress={handleSendWhatsappMessageProvider}
                                />
                            </HStack>
                        </VStack>
                    }

                    <TextArea
                        h={80}
                        p={6}
                        shadow={5}
                        title="Descrição"
                    />

                    {
                        !isConsumer &&
                        <Button
                            my={7}
                            variant="primary"
                            title="Enviar"
                        />
                    }

                    {
                        isConsumer &&
                        <Button
                            my={7}
                            variant="sucess"
                            title="Aceitar"
                        />
                    }

                </VStack>
            </ScrollView>

        </VStack>
    );
}