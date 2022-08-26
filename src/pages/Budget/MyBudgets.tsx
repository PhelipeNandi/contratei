import { VStack, FlatList, Center, Text, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Clipboard } from 'phosphor-react-native';

import { Button } from '../../components/ui/Button';
import { Header } from '../../components/ui/Header';
import { BudgetCardDetails } from '../../components/ui/BudgetCardDetails';

import { Budget } from '../../types/budget';

export function MyBudgets() {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const budgets: Budget[] = [
        {
            id: '5',
            title: 'Ajuste no cano da pia',
            description: '',
            serviceType: 'Encanador',
            value: 'R$ 30,50',
            openingDate: '15 AGO',
            status: 'open',
            priorityLevel: 'TODAY'
        },
        {
            id: '4',
            title: 'Faxina da casa',
            description: '',
            serviceType: 'Limpeza',
            value: 'R$ 130,00',
            openingDate: '12 AGO',
            status: 'closed',
            priorityLevel: 'TODAY'
        },
        {
            id: '3',
            title: 'Troca de chuveiro',
            description: '',
            serviceType: 'Eletricista',
            value: 'R$ 48,30',
            openingDate: '10 AGO',
            status: 'closed',
            priorityLevel: 'TODAY'
        },
        {
            id: '2',
            title: 'Limpeza no jardim',
            description: '',
            serviceType: 'Jardineiro',
            value: 'R$ 70,00',
            openingDate: '08 AGO',
            status: 'closed',
            priorityLevel: 'TODAY'
        },
        {
            id: '1',
            title: 'Troca de cor do galpão',
            description: '',
            serviceType: 'Pintor',
            value: 'R$ 220,35',
            openingDate: '02 AGO',
            status: 'open',
            priorityLevel: 'TODAY'
        }
    ]

    return (
        <VStack flex={1} justifyContent="center">
            <Header title="Meus orçamentos" />

            <VStack flex={1} px={8} bg="background">

                <FlatList
                    data={budgets}
                    keyExtractor={budget => budget.id}
                    renderItem={({ item }) => <BudgetCardDetails data={item} />}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Center mt={12}>
                            <Clipboard color={colors.gray[300]} size={32} />
                            <Text color="gray.300" fontFamily="body" fontSize="sm">
                                Você ainda não possui {"\n"}
                                orçamentos ou serviços
                            </Text>
                        </Center>
                    )}
                />

            </VStack>
        </VStack >
    );
}