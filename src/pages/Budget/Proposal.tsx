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
import { useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { WhatsappLogo, SuitcaseSimple } from 'phosphor-react-native';

import { ProviderBudget } from '../../types/provider';
import { NewProposalBudget } from '../../types/budget';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { removeMaskContactNumberValeu } from '../../utils/masks';
import { useProviderContext } from '../../hooks/useProviderContext';
import { propsStack } from '../../routes/Navigators/Models';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/form/Input';
import { Modal } from '../../components/form/Modal';
import { CardProvider } from '../../features/budget';
import { TextArea } from '../../components/form/TextArea';
import { createProposal } from '../../features/proposal';

const newProposalBudget: yup.SchemaOf<NewProposalBudget> = yup.object({
    description: yup.string().required("Descrição obrigatória"),
    averageValue: yup.string().required("Valor Médio obrigatório")
});

export function Proposal() {
    const { colors } = useTheme();
    const queryClient = useQueryClient();
    const { budget } = useBudgetContext();
    const { user, isConsumer } = useAuthContext();
    const navigation = useNavigation<propsStack>();
    const { searchProvider } = useProviderContext();
    const [showModal, setShowModal] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<NewProposalBudget>({
        resolver: yupResolver(newProposalBudget)
    });

    const {
        isLoading,
        mutate
    } = useMutation((data: NewProposalBudget) => createProposal(data, user.id, budget.id), {
        onSuccess: () => {
            queryClient.invalidateQueries("budget");
            navigation.goBack();
        }
    });

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

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { value, onChange } }) => (
                            <TextArea
                                h={80}
                                p={6}
                                mb={5}
                                isDisabled={isConsumer}
                                title="Descrição"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.description?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="averageValue"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                isDisabled={isConsumer}
                                title="Valor Médio"
                                keyboardType="numeric"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.averageValue?.message}
                            />
                        )}
                    />

                    {
                        !isConsumer &&
                        <Button
                            my={7}
                            variant="primary"
                            title="Enviar"
                            isLoading={isLoading}
                            isLoadingText="Salvando"
                            onPress={handleSubmit((value) => mutate(value))}
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