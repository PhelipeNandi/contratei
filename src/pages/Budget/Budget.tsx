import { useEffect } from 'react';
import { VStack, ScrollView, Divider, Center, Text, useTheme } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { propsNavigationStack } from '../../routes/Navigators/Models';
import { useQuery } from 'react-query';
import {
    Briefcase,
    ClipboardText,
    CircleHalf,
    Article,
    CalendarBlank,
    Money,
    HourglassMedium,
    Warning
} from 'phosphor-react-native';

import { normalizeServiceType, normalizePriorityLevel } from '../../utils/formatStrings';

import { Header } from '../../components/ui/Header';
import { Loading } from '../../components/ui/Loading';
import { CardDetails, ProgressStatusBudget, CardProvider, getBudgetById } from '../../features/budget';

export function Budget() {
    const { colors } = useTheme();
    const route = useRoute<RouteProp<propsNavigationStack, "budget">>();

    const {
        data: budget,
        isSuccess,
        isLoading,
        isError
    } = useQuery("budget", () => getBudgetById(route.params?.idBudget));

    useEffect(() => {
        console.log(budget);
    }, [])

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
                                    description={budget.value}
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
                                    />
                                }
                            />
                        }

                    </VStack>
                </ScrollView>
            }

        </VStack>
    );
}