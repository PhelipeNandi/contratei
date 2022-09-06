import { useEffect, useState } from 'react';
import { VStack, FlatList, Center, Text, useTheme, HStack, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Briefcase } from 'phosphor-react-native';

import { Header } from '../../components/ui/Header';
import { SelectStatusBudget } from '../../features/myBudgets';
import { BudgetCardDetails } from '../../features/myBudgets/components/BudgetCardDetails';

import { Budget } from '../../types/budget';

export function MyBudgets() {
    const budgetsArray: Budget[] = [
        {
            id: '6',
            title: 'Cortar grama',
            description: '',
            serviceType: 'Jardineiro',
            value: 'R$ 20,00',
            openingDate: '18 AGO',
            status: 'open',
            priorityLevel: 'TODAY'
        },
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
            status: 'finish',
            priorityLevel: 'TODAY'
        },
        {
            id: '3',
            title: 'Troca de chuveiro',
            description: '',
            serviceType: 'Eletricista',
            value: 'R$ 48,30',
            openingDate: '10 AGO',
            status: 'finish',
            priorityLevel: 'TODAY'
        },
        {
            id: '2',
            title: 'Limpeza no jardim',
            description: '',
            serviceType: 'Jardineiro',
            value: 'R$ 70,00',
            openingDate: '08 AGO',
            status: 'finish',
            priorityLevel: 'TODAY'
        },
        {
            id: '1',
            title: 'Troca de cor do galpão',
            description: '',
            serviceType: 'Pintor',
            value: 'R$ 220,35',
            openingDate: '02 AGO',
            status: 'canceled',
            priorityLevel: 'TODAY'
        }
    ]

    const navigation = useNavigation();
    const { colors } = useTheme();

    const [budgets, setBudgets] = useState(budgetsArray);
    const [budgetsFiltered, setBudgetsFiltered] = useState([]);
    const [labelBudgetQuantity, setLabelBudgetQuantity] = useState("");
    const [statusBudgetSelect, setStatusBudgetSelect] = useState("");

    useEffect(() => {
        setBudgetsFiltered(budgets);
    }, [])

    useEffect(() => {
        setLabelBudgetQuantity("Quantidade: " + budgetsFiltered.length);
    }, [budgetsFiltered])

    function filterBudgetSelect(status: string) {
        switch (status) {
            case "all":
                setBudgetsFiltered(budgets);
                break;
            case "open":
                setStatusBudgetSelect("aberto");
                setBudgetsFiltered(budgets.filter((b) => b.status === "open"));
                break;
            case "inProgress":
                setStatusBudgetSelect("em andamento");
                setBudgetsFiltered(budgets.filter((b) => b.status === "inProgress"));
                break;
            case "finish":
                setStatusBudgetSelect("finalizado");
                setBudgetsFiltered(budgets.filter((b) => b.status === "finish"));
                break;
            case "canceled":
                setStatusBudgetSelect("cancelado");
                setBudgetsFiltered(budgets.filter((b) => b.status === "canceled"));
                break;
        }
    }

    function handleNavigateBudget(idBudget: number) {
        navigation.navigate('budget', { idBudget });
    }

    return (
        <VStack flex={1} justifyContent="center">
            <Header title="Meus orçamentos" />

            <Divider bg="white" />

            <VStack flex={1} bg="background">

                <SelectStatusBudget
                    my={2}
                    mx={3}
                    onValueChange={(selectValue) => filterBudgetSelect(selectValue)}
                />

                <Text
                    mb={1}
                    mr={4}
                    fontFamily="body"
                    fontSize="xs"
                    color="primary.700"
                    textAlign="right"
                >
                    {labelBudgetQuantity}
                </Text>

                <FlatList
                    px={4}
                    data={budgetsFiltered}
                    keyExtractor={budget => budget.id}
                    renderItem={({ item }) => <BudgetCardDetails data={item} onPress={() => handleNavigateBudget(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Center mt={40}>
                            <Briefcase color={colors.gray[300]} size={32} />
                            <Text textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Você ainda não possui
                                orçamentos {statusBudgetSelect}
                            </Text>
                        </Center>
                    )}
                />

            </VStack>
        </VStack >
    );
}