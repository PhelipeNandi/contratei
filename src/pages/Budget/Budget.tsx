import { useState, useEffect } from 'react';
import { VStack, ScrollView, Divider, Button as NativeBaseButton, Center, Text, useTheme } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from 'react-query';
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
    Warning
} from 'phosphor-react-native';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { useProviderContext } from '../../hooks/useProviderContext';
import { normalizeServiceType, normalizePriorityLevel } from '../../utils/formatStrings';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/form/Modal';
import { Loading } from '../../components/ui/Loading';
import { searchProposalsByIdBudget } from '../../features/proposal';
import { CardDetails, ProgressStatusBudget, CardProvider, CardProviderOffer, getBudgetById } from '../../features/budget';

export function Budget() {
    const { colors } = useTheme();
    const { showAlert } = useBudgetContext();
    const { isConsumer } = useAuthContext();
    const navigation = useNavigation<propsStack>();
    const { searchProvider } = useProviderContext();
    const [showModal, setShowModal] = useState<boolean>(false);
    const routes = useRoute<RouteProp<propsNavigationStack, "budget">>();
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

                        {
                            budget.value &&
                            <VStack>
                                <Divider />

                                <CardDetails
                                    title="valor"
                                    icon={Money}
                                    description={"R$: " + budget.value}
                                />

                                <Divider />
                            </VStack>
                        }

                        {
                            budget.provider &&
                            <CardDetails
                                title="Fornecedor"
                                icon={Briefcase}
                                children={
                                    <CardProvider
                                        pl={5}
                                        data={budget.provider}
                                        onPress={() => handleNavigateProvider(budget.provider.id)}
                                    />
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
                            </VStack>
                        }

                        {
                            !isConsumer
                            && budget.status === "OPEN"
                            && <Button
                                my={3}
                                title="Enviar Proposta"
                                variant="primary"
                                onPress={() => navigation.navigate("proposal", { idBudget: routes.params?.idBudget })}
                            />
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
            }
        </VStack>
    );
}