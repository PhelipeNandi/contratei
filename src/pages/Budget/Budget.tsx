import { VStack, ScrollView } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { propsNavigationStack } from '../../routes/Navigators/Models';
import {
    Briefcase,
    ClipboardText,
    CircleHalf,
    Article,
    CalendarBlank,
    Money,
    HourglassMedium
} from 'phosphor-react-native';

import { Budget as BudgetType } from '../../types/budget';

import { Header } from '../../components/ui/Header';
import { CardDetails, ProgressStatusBudget, CardProvider } from '../../features/budget';
import { normalizeServiceType, normalizePriorityLvel } from '../../utils/formatStrings';
import { Provider } from '../../types/provider';

export function Budget() {
    const route = useRoute<RouteProp<propsNavigationStack, "budget">>();

    const budget: BudgetType = {
        id: 6,
        consumerId: 1,
        providerId: 1,
        serviceType: 'EMPREGADO',
        status: 'OPEN',
        title: 'Faxina da casa',
        description: 'Limpeza do apartamento',
        openingDate: '18/09/2022',
        priorityLevel: 'TODAY',
        value: 'R$ 50,00'
    }

    const provider: Provider = {
        id: 1,
        serviceType: 'EMPREGRADO',
        firstName: 'Fornecedor',
        lastName: '1',
        contactNumber: '(48) 99999-9999',
        cpf: '077.321.526-38',
        email: 'empregado@provider.com',
        description: 'Descrição do Empregado',
        kmWorkRange: '50.0',
        hourValue: '100.00',
    }

    return (
        <VStack flex={1} justifyContent="center" bg="background">
            <Header title={"Orçamento " + budget.id} />

            <ScrollView>
                <VStack flex={1} px={6} bg="background">

                    <CardDetails
                        title="título"
                        icon={Article}
                        description={budget.title}
                    />

                    <CardDetails
                        title="tipo de serviço"
                        icon={Briefcase}
                        description={normalizeServiceType(budget.serviceType)}
                    />


                    <CardDetails
                        title="status"
                        icon={CircleHalf}
                        children={
                            <ProgressStatusBudget
                                status={budget.status}
                            />
                        }
                    />

                    <CardDetails
                        title="Nível de Prioridade"
                        icon={HourglassMedium}
                        description={normalizePriorityLvel(budget.priorityLevel)}
                    />

                    <CardDetails
                        title="descrição"
                        icon={ClipboardText}
                        description={budget.description}
                    />

                    <CardDetails
                        title="data de abertura"
                        icon={CalendarBlank}
                        description={budget.openingDate}
                    />

                    {
                        !!budget.completionDate &&
                        <CardDetails
                            title="data de abertura"
                            icon={CalendarBlank}
                            description={budget.completionDate}
                        />
                    }

                    <CardDetails
                        title="valor"
                        icon={Money}
                        description={budget.value}
                    />

                    {
                        !!budget.providerId &&
                        <CardDetails
                            title="Fornecedor"
                            icon={Briefcase}
                            children={
                                <CardProvider
                                    data={provider}
                                />
                            }
                        />
                    }

                </VStack>
            </ScrollView>

        </VStack>
    );
}