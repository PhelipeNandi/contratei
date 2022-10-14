import { useState } from 'react';
import { Linking } from 'react-native';
import {
    VStack,
    HStack,
    Text,
    IconButton,
    useTheme,
    ScrollView,
    Button as NativeBaseButton
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { WhatsappLogo, SuitcaseSimple } from 'phosphor-react-native';

import { ProviderBudget } from '../../types/provider';
import { propsStack } from '../../routes/Navigators/Models';
import { useAuthContext } from '../../hooks/useAuthContext';
import { removeMaskContactNumberValeu } from '../../utils/masks';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/form/Input';
import { Modal } from '../../components/form/Modal';
import { CardProvider } from '../../features/budget';
import { TextArea } from '../../components/form/TextArea';
import { useProviderContext } from '../../hooks/useProviderContext';

export function Proposal() {
    const { colors } = useTheme();
    const { user, isConsumer } = useAuthContext();
    const { searchProvider } = useProviderContext();
    const navigation = useNavigation<propsStack>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const provider: ProviderBudget =
    {
        id: 1,
        firstName: 'Fornecedor',
        lastName: '1',
        contactNumber: '(48) 99638-5477',
        profilePicture: null
    }

    async function handleNavigateProvider(idProvider: number) {
        await searchProvider(idProvider)
            .then(() => {
                navigation.navigate("provider", { isHirable: false });
            })
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            });
    }

    async function handleSendWhatsappMessageProvider() {
        Linking.openURL(
            `https://wa.me/55${removeMaskContactNumberValeu(provider.contactNumber)}?`
            + `text=Olá,%20me%20chamo%20${user.firstName}.%0A`
            + `Gostaria%20de%20tirar%20algumas%20dúvidas%20a%20respeito%20`
            + `da%20proposta%20que%20você%20me%20encaminhou`
        );
    }

    return (
        <VStack flex={1} justifyContent="center" bg="background">

            <Header title="Proposta" />

            <ScrollView>
                <VStack flex={1} mt={5} px={8} bg="background">

                    {
                        isConsumer &&
                        <VStack>
                            <Text mb={3} fontFamily="body" fontSize="xs" color="gray.300">
                                Fornecedor
                            </Text>

                            <HStack mb={5} justifyContent="space-between" alignItems="center">
                                <CardProvider
                                    data={provider}
                                    onPress={() => handleNavigateProvider(provider.id)}
                                />

                                <IconButton
                                    icon={<WhatsappLogo color={colors.green[700]} size="35" weight='thin' />}
                                    onPress={handleSendWhatsappMessageProvider}
                                />
                            </HStack>
                        </VStack>
                    }

                    <TextArea
                        h={80}
                        p={6}
                        mb={5}
                        isDisabled={isConsumer}
                        title="Descrição"
                    />

                    <Input
                        isDisabled={isConsumer}
                        title="Valor Médio"
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
                        <HStack my={8} space={4}>
                            <Button
                                flex={1}
                                variant="danger"
                                title="Recusar"
                                onPress={() => setShowModal(true)}
                            />

                            <Button
                                flex={1}
                                variant="sucess"
                                title="Aceitar"
                            />
                        </HStack>
                    }

                    <Modal
                        header="Recusar"
                        body="Você tem certeza que quer recusar essa propsta?"
                        icon={SuitcaseSimple}
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <NativeBaseButton.Group space={2}>
                            <Button
                                title="Cancelar"
                                variant="primary"
                                onPress={() => setShowModal(false)}
                            />
                            <Button
                                title="Recusar"
                                variant="danger"
                            />
                        </NativeBaseButton.Group>
                    </Modal>

                </VStack>
            </ScrollView>

        </VStack>
    );
}