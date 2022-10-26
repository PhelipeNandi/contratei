import { useState } from 'react';
import { Linking } from 'react-native';
import { VStack, ScrollView, Divider, Button as NativeBaseButton, Center, Text, useTheme, HStack, IconButton } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';
import {
    Briefcase,
    ClipboardText,
    CircleHalf,
    Article,
    CalendarBlank,
    Money,
    HourglassMedium,
    SuitcaseSimple,
    Warning,
    WhatsappLogo,
    Gear,
    User
} from 'phosphor-react-native';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { removeMaskContactNumberValeu } from '../../utils/masks';
import { useProviderContext } from '../../hooks/useProviderContext';
import { normalizeServiceType, normalizePriorityLevel } from '../../utils/formatStrings';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/form/Modal';
import { Loading } from '../../components/ui/Loading';
import { searchProposalsByIdBudget, searchProposalByIdProvider } from '../../features/proposal';
import {
    CardDetails,
    ProgressStatusBudget,
    UserCard,
    CardProviderOffer,
    getBudgetById,
    changeBudget
} from '../../features/budget';
import { Input } from '../../components/form/Input';

export function Budget() {
    const { colors } = useTheme();
    const queryClient = useQueryClient();
    const { showAlert } = useBudgetContext();
    const { user, isConsumer } = useAuthContext();
    const navigation = useNavigation<propsStack>();
    const { searchProvider } = useProviderContext();
    const [showModal, setShowModal] = useState<boolean>(false);
    const routes = useRoute<RouteProp<propsNavigationStack, "budget">>();
    const [valueBudget, setValueBudget] = useState<string | null>(null);
    const [showModalCancelBudget, setShowModalCancelBudget] = useState<boolean>(false);
    const [enableProposalsSearch, setEnableProposalsSearch] = useState<boolean>(false);

    const {
        data: budget,
        isSuccess: budgetIsSuccess,
        isLoading: budgetIsLoading,
        isError: budgetIsError
    } = useQuery("budget", () => getBudgetById(routes.params?.idBudget), {
        onSuccess: () => {
            setEnableProposalsSearch(true);
        }
    });

    const {
        data: proposals,
        isSuccess: proposalsIsSuccess,
        isLoading: proposalsIsLoading,
        isError: proposalsIsError
    } = useQuery("proposals", () => searchProposalsByIdBudget(routes.params?.idBudget), {
        enabled: enableProposalsSearch
    });

    const {
        data: proposalProvider,
        isSuccess: proposalProviderIsSuccess,
        isLoading: proposalProviderIsLoading,
        isError: proposalProviderIsError
    } = useQuery("proposalProvider", () => searchProposalByIdProvider(user.id, routes.params?.idBudget), {
        enabled: enableProposalsSearch && !isConsumer
    });

    const {
        mutate,
        isLoading
    } = useMutation((status: string) => changeBudget(budget, status, valueBudget), {
        onSuccess: () => {
            queryClient.invalidateQueries("budget");
            queryClient.invalidateQueries("budgets");
            queryClient.invalidateQueries("myBudgets");
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
            `https://wa.me/55${removeMaskContactNumberValeu(budget.provider.contactNumber)}?`
            + `text=Olá,%20me%20chamo%20${user.firstName}.%0A`
            + `Gostaria%20de%20tirar%20algumas%20dúvidas%20a%20respeito%20`
            + `da%20orçamento%20${budget.title}`
        );
    }

    async function handleSendWhatsappMessageConsumer() {
        Linking.openURL(
            `https://wa.me/55${removeMaskContactNumberValeu(budget.consumer.contactNumber)}?`
            + `text=Olá,%20me%20chamo%20${user.firstName}.%0A`
            + `Gostaria%20de%20tirar%20algumas%20dúvidas%20a%20respeito%20`
            + `da%20orçamento%20${budget.title}`
        );
    }

    return (
        <VStack flex={1} justifyContent="center" bg="background">
            <Header title="Orçamento" />

            {
                budgetIsLoading &&
                <Loading />
            }

            {
                budgetIsError &&
                <Center flex={1}>
                    <Warning color={colors.red[600]} size={32} />
                    <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                        Aconteceu um erro ao buscar {"\n"}
                        os dados do orçamento
                    </Text>
                </Center>
            }

            {
                budgetIsSuccess &&
                <ScrollView>
                    <VStack flex={1} my={2} px={5} bg="background">
                        <CardDetails
                            title="título"
                            icon={Article}
                            description={budget.title}
                        />

                        <Divider />

                        <CardDetails
                            title="tipo de serviço"
                            icon={Briefcase}
                            description={normalizeServiceType(budget.serviceType)}
                        />

                        <Divider />

                        <CardDetails
                            title="status"
                            icon={CircleHalf}
                            children={
                                <ProgressStatusBudget
                                    status={budget.status}
                                />
                            }
                        />
                        <Divider />

                        <CardDetails
                            title="Nível de Prioridade"
                            icon={HourglassMedium}
                            description={normalizePriorityLevel(budget.priorityLevel)}
                        />
                        <Divider />

                        <CardDetails
                            title="descrição"
                            icon={ClipboardText}
                            description={budget.description}
                        />
                        <Divider />

                        <CardDetails
                            title="data de abertura"
                            icon={CalendarBlank}
                            description={budget.openingDate}
                        />


                        {
                            budget.completionDate &&
                            <VStack>
                                <Divider />

                                <CardDetails
                                    title="data de finalização"
                                    icon={CalendarBlank}
                                    description={budget.completionDate}
                                />
                            </VStack>
                        }

                        <VStack>
                            <Divider />

                            <CardDetails
                                flex={1}
                                title="valor"
                                icon={Money}
                                children={
                                    <Input
                                        mx={5}
                                        isDisabled={isConsumer || budget.status != "IN_PROGRESS" || isLoading}
                                        value={valueBudget != null ? valueBudget : budget.value != null ? budget.value.toString() : null}
                                        onChangeText={setValueBudget}
                                        placeholder="0,00"
                                        keyboardType="numeric"
                                        onEndEditing={() => mutate(budget.status)}
                                    />
                                }
                            />

                            <Divider />
                        </VStack>

                        {
                            isConsumer && budget.provider
                            && <CardDetails
                                title="Fornecedor"
                                icon={Briefcase}
                                children={
                                    <HStack mr={2} justifyContent="space-between" alignItems="center">
                                        <UserCard
                                            pl={5}
                                            provider={budget.provider}
                                            onPress={() => handleNavigateProvider(budget.provider.id)}
                                        />

                                        <IconButton
                                            icon={<WhatsappLogo color={colors.green[700]} size="35" weight='thin' />}
                                            onPress={handleSendWhatsappMessageProvider}
                                        />
                                    </HStack>
                                }
                            />
                        }

                        {
                            !isConsumer && budget.provider && (budget.status != "OPEN")
                            && <CardDetails
                                title="Consumidor"
                                icon={User}
                                children={
                                    <HStack mr={2} justifyContent="space-between" alignItems="center">
                                        <UserCard
                                            pl={5}
                                            consumer={budget.consumer}
                                        />

                                        <IconButton
                                            icon={<WhatsappLogo color={colors.green[700]} size="35" weight='thin' />}
                                            onPress={handleSendWhatsappMessageConsumer}
                                        />
                                    </HStack>
                                }
                            />
                        }

                        {
                            isConsumer && budget.status === "OPEN"
                            && <VStack>
                                {
                                    proposalsIsLoading &&
                                    <Loading />
                                }

                                {
                                    proposalsIsError &&
                                    <Center mt={5} flex={1}>
                                        <Warning color={colors.red[600]} size={32} />
                                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                            Aconteceu um erro ao  {"\n"}
                                            buscar as propostas
                                        </Text>
                                    </Center>
                                }

                                {
                                    proposalsIsSuccess &&
                                    <CardDetails
                                        title="Propostas"
                                        icon={SuitcaseSimple}
                                        children={
                                            proposals.map((proposal, index) => {
                                                return <CardProviderOffer
                                                    data={proposal.provider}
                                                    key={index}
                                                    onPress={() => handleNavigateProvider(proposal.provider.id)}
                                                    onPressRefuse={() => setShowModal(true)}
                                                    onPressOffer={() => navigation.navigate("proposal", { idBudget: routes.params?.idBudget, idProposal: proposal.id })}
                                                />
                                            })
                                        }
                                    />
                                }

                                {
                                    !(proposals === undefined || proposals.length != 0) &&
                                    <Center mb={3}>
                                        <SuitcaseSimple color={colors.gray[300]} size={32} />
                                        <Text my={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                            Você ainda não recebeu {"\n"}
                                            nenhuma proposta
                                        </Text>
                                    </Center>
                                }
                            </VStack>
                        }

                        {
                            !isConsumer && budget.status === "OPEN"
                            && <VStack>
                                {
                                    proposalProviderIsLoading &&
                                    <Loading />
                                }

                                {
                                    proposalProviderIsError &&
                                    <Center mt={5} flex={1}>
                                        <Warning color={colors.red[600]} size={32} />
                                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                            Aconteceu um erro ao  {"\n"}
                                            buscar sua proposta
                                        </Text>
                                    </Center>
                                }

                                {
                                    proposalProviderIsSuccess && proposalProvider != undefined &&
                                    <CardDetails
                                        title="Propostas"
                                        icon={SuitcaseSimple}
                                        children={
                                            <CardProviderOffer
                                                data={proposalProvider.provider}
                                                onPress={() => handleNavigateProvider(proposalProvider.provider.id)}
                                                onPressRefuse={() => setShowModal(true)}
                                                onPressOffer={() => navigation.navigate("proposal", { idBudget: routes.params?.idBudget, idProposal: proposalProvider.id })}
                                            />
                                        }
                                    />
                                }

                                {
                                    (proposalProvider === undefined || proposalProvider === null) &&
                                    <Button
                                        my={3}
                                        title="Enviar Proposta"
                                        variant="primary"
                                        onPress={() => navigation.navigate("proposal", { idBudget: routes.params?.idBudget })}
                                    />
                                }
                            </VStack>
                        }

                        {
                            ((isConsumer && budget.status != "CANCELED" && budget.status != "CLOSED")
                                || (!isConsumer && budget.status === "IN_PROGRESS"))
                            && <VStack>
                                <Divider />

                                <CardDetails
                                    title="Ações"
                                    icon={Gear}
                                    children={
                                        <HStack mx={5} space={4}>
                                            <Button
                                                flex={1}
                                                title="Cancelar"
                                                variant="danger"
                                                onPress={() => setShowModalCancelBudget(true)}
                                            />

                                            {
                                                !isConsumer
                                                && <Button
                                                    flex={1}
                                                    title="Finalizar"
                                                    variant="sucess"
                                                    onPress={() => mutate("CLOSED")}
                                                />
                                            }

                                        </HStack>
                                    }
                                />
                            </VStack>
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

                        <Modal
                            header="Recusar"
                            body="Você tem certeza que quer cancelar esse orçamento?"
                            icon={SuitcaseSimple}
                            isOpen={showModalCancelBudget}
                            onClose={() => setShowModalCancelBudget(false)}
                        >
                            <NativeBaseButton.Group space={2}>
                                <Button
                                    title="Voltar"
                                    variant="primary"
                                    onPress={() => setShowModalCancelBudget(false)}
                                />
                                <Button
                                    title="Cancelar"
                                    variant="danger"
                                    onPress={() => {
                                        mutate("CANCELED");
                                        setShowModalCancelBudget(false)
                                    }}
                                />
                            </NativeBaseButton.Group>
                        </Modal>
                    </VStack>
                </ScrollView>
            }
        </VStack>
    );
}