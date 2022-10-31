import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import {
    VStack,
    HStack,
    Text,
    IconButton,
    useTheme,
    ScrollView,
    Button as NativeBaseButton,
    Center
} from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { WhatsappLogo, SuitcaseSimple, Warning } from 'phosphor-react-native';

import { NewProposalBudget } from '../../types/budget';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { removeMaskContactNumberValeu } from '../../utils/masks';
import { useProviderContext } from '../../hooks/useProviderContext';
import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/form/Input';
import { Modal } from '../../components/form/Modal';
import { UserCard } from '../../features/budget';
import { TextArea } from '../../components/form/TextArea';
import { acceptProposal, createProposal, searchProposalByIdProposal } from '../../features/proposal';
import { Loading } from '../../components/ui/Loading';

const newProposalBudget: yup.SchemaOf<NewProposalBudget> = yup.object({
    description: yup.string().required("Descrição obrigatória"),
    averageValue: yup.string().required("Valor Médio obrigatório")
});

export function Proposal() {
    const { colors } = useTheme();
    const queryClient = useQueryClient();
    const { setShowAlert } = useBudgetContext();
    const { user, isConsumer } = useAuthContext();
    const navigation = useNavigation<propsStack>();
    const { searchProvider } = useProviderContext();
    const [showModal, setShowModal] = useState<boolean>(false);
    const routes = useRoute<RouteProp<propsNavigationStack, "proposal">>();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<NewProposalBudget>({
        resolver: yupResolver(newProposalBudget)
    });

    const {
        data,
        isSuccess,
        isLoading,
        isError,
        isFetched
    } = useQuery(["proposal", routes.params?.idProposal], () => searchProposalByIdProposal(routes.params?.idProposal), {
        enabled: routes.params?.idProposal != undefined
    });

    useEffect(() => {
        if (isFetched) {
            setValue("description", data.description);
            setValue("averageValue", data.averageValue.toString());
        }
    }, [isFetched]);

    const {
        isLoading: isLoadingNewProposalBudget,
        mutate: mutateNewProposalBudget
    } = useMutation((data: NewProposalBudget) => createProposal(data, user.id, routes.params?.idBudget), {
        onSuccess: () => {
            queryClient.invalidateQueries("budget");
            queryClient.invalidateQueries("proposalProvider");
            navigation.goBack();
        }
    });

    const {
        isLoading: isLoadingAcceptProposal,
        mutate: mutateAcceptProposal
    } = useMutation(() => acceptProposal(routes.params?.idProposal, routes.params?.idBudget), {
        onSuccess: () => {
            queryClient.invalidateQueries("budget");
            queryClient.invalidateQueries("budgets");
            queryClient.invalidateQueries("myBudgets");
            navigation.goBack();
        }
    });

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
            `https://wa.me/55${removeMaskContactNumberValeu(data.provider.contactNumber)}?`
            + `text=Olá,%20me%20chamo%20${user.firstName}.%0A`
            + `Gostaria%20de%20tirar%20algumas%20dúvidas%20a%20respeito%20`
            + `da%20proposta%20que%20você%20me%20encaminhou`
        );
    }

    return (
        <VStack flex={1} justifyContent="center" bg="background">

            <Header title="Proposta" />

            {
                isLoading &&
                <Loading />
            }

            {
                isError &&
                <Center mt={5} flex={1}>
                    <Warning color={colors.red[600]} size={32} />
                    <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                        Aconteceu um erro ao  {"\n"}
                        buscar os dados da proposta
                    </Text>
                </Center>
            }

            {
                (isSuccess || !isConsumer) &&
                <ScrollView>
                    <VStack flex={1} mt={5} px={8} bg="background">
                        {
                            isConsumer
                            && <VStack>
                                <Text mb={3} fontFamily="body" fontSize="xs" color="gray.300">
                                    Fornecedor
                                </Text>

                                <HStack mb={5} justifyContent="space-between" alignItems="center">
                                    <UserCard
                                        provider={data.provider}
                                        onPress={() => handleNavigateProvider(data.provider.id)}
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
                                    isDisabled={isFetched}
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
                                    isDisabled={isFetched}
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
                                isDisabled={isFetched}
                                isLoading={isLoadingNewProposalBudget}
                                isLoadingText="Salvando"
                                onPress={handleSubmit((value) => mutateNewProposalBudget(value))}
                            />
                        }

                        {
                            isConsumer &&
                            <Button
                                my={8}
                                variant="sucess"
                                title="Aceitar"
                                onPress={() => setShowModal(true)}
                            />
                        }

                        <Modal
                            header="Aceitar"
                            body="Você tem certeza que quer aceitar essa propsta? Ao aceitar o sistema irá recusar as outras."
                            icon={SuitcaseSimple}
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                        >
                            <NativeBaseButton.Group space={2}>
                                <Button
                                    title="Cancelar"
                                    variant="danger"
                                    onPress={() => setShowModal(false)}
                                />
                                <Button
                                    title="Aceitar"
                                    variant="sucess"
                                    isLoading={isLoadingAcceptProposal}
                                    isLoadingText="Aceitando"
                                    onPress={handleSubmit(() => mutateAcceptProposal())}
                                />
                            </NativeBaseButton.Group>
                        </Modal>

                    </VStack>
                </ScrollView>
            }
        </VStack>
    );
}