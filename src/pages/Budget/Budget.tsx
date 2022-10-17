import { useState } from 'react';
import { VStack, ScrollView, Divider, Center, Text, useTheme, Button as NativeBaseButton } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';
import { useQuery } from 'react-query';
import {
    Briefcase,
    ClipboardText,
    CircleHalf,
    Article,
    CalendarBlank,
    Money,
    HourglassMedium,
    Warning,
    SuitcaseSimple
} from 'phosphor-react-native';

import { Provider } from '../../types/provider';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProviderContext } from '../../hooks/useProviderContext';
import { normalizeServiceType, normalizePriorityLevel } from '../../utils/formatStrings';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/form/Modal';
import { Loading } from '../../components/ui/Loading';
import { CardDetails, ProgressStatusBudget, CardProvider, getBudgetById, CardProviderOffer } from '../../features/budget';

export function Budget() {
    const { colors } = useTheme();
    const { isConsumer } = useAuthContext();
    const { searchProvider } = useProviderContext();
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigation = useNavigation<propsStack>();
    const route = useRoute<RouteProp<propsNavigationStack, "budget">>();

    const providerList: Provider[] = [
        {
            id: 1,
            serviceType: 'EMPREGRADO',
            firstName: 'Fornecedor',
            lastName: '1',
            contactNumber: '(48) 99999-9999',
            cpf: '077.321.526-38',
            email: 'empregado@provider.com',
            description: 'Descrição do Empregado',
            hourValue: '100.00',
            actingRegion: 'CITY',
            rating: "5",
            backgroundImage: null,
            profilePicture: null
        },
        {
            id: 2,
            serviceType: 'EMPREGRADO',
            firstName: 'Fornecedor',
            lastName: '1',
            contactNumber: '(48) 99999-9999',
            cpf: '077.321.526-38',
            email: 'empregado@provider.com',
            description: 'Descrição do Empregado',
            hourValue: '100.00',
            actingRegion: 'CITY',
            rating: "5",
            backgroundImage: null,
            profilePicture: null
        }
    ]

    const {
        data: budget,
        isSuccess,
        isLoading,
        isError
    } = useQuery("budget", () => getBudgetById(route.params?.idBudget));

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
                isLoading &&
                <Loading />
            }

            {
                isError &&
                <Center flex={1}>
                    <Warning color={colors.red[600]} size={32} />
                    <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                        Aconteceu um erro ao buscar o orçamento
                    </Text>
                </Center>
            }

            {
                isSuccess &&
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
                            providerList.length > 0
                            && budget.status === "OPEN"
                            && isConsumer
                            && <CardDetails
                                title="Propostas"
                                icon={SuitcaseSimple}
                                children={
                                    providerList.map((provider, index) => {
                                        return <CardProviderOffer
                                            data={provider}
                                            key={index}
                                            onPress={() => handleNavigateProvider(provider.id)}
                                            onPressRefuse={() => setShowModal(true)}
                                            onPressOffer={() => navigation.navigate("proposal", { idBudget: budget.id, idProposal: 1 })}
                                        />
                                    })
                                }
                            />
                        }

                        {
                            !isConsumer
                            && budget.status === "OPEN"
                            && <Button
                                my={3}
                                title="Enviar Proposta"
                                variant="primary"
                                onPress={() => navigation.navigate("proposal")}
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