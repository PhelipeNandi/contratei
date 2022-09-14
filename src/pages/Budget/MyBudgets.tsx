import { useEffect, useState } from 'react';
import { VStack, FlatList, Center, Text, useTheme, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Briefcase } from 'phosphor-react-native';

import { Budget } from '../../types/budget';
import { useAuthContext } from '../../hooks/useAuthContext';

import { Header } from '../../components/ui/Header';
import { searchMyBudgets } from '../../features/myBudgets/services/searchMyBudgets';
import { SelectStatusBudget, BudgetCardDetails } from '../../features/myBudgets';

export function MyBudgets() {
    const { colors } = useTheme();
    const { navigate } = useNavigation();
    const { user } = useAuthContext();
    const [budgets, setBudgets] = useState<Budget[]>();
    const [budgetsFiltered, setBudgetsFiltered] = useState<Budget[]>();
    const [labelBudgetQuantity, setLabelBudgetQuantity] = useState<string>();
    const [statusBudgetSelect, setStatusBudgetSelect] = useState<string>();

    useEffect(() => {
        async function handleSearchMyBudgets() {
            try {
                await searchMyBudgets("0", "5", user.id)
                    .then((budgets) => {
                        setBudgets(budgets);
                        setBudgetsFiltered(budgets);
                    })
                    .catch((error) => {
                        if (error instanceof Error) {
                            console.log(error.message);
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }

        handleSearchMyBudgets();
    }, []);

    useEffect(() => {
        setLabelBudgetQuantity("Quantidade: " + budgetsFiltered?.length);
    }, [budgetsFiltered]);

    function filterBudgetSelect(status: string) {
        switch (status) {
            case "ALL":
                setBudgetsFiltered(budgets);
                break;
            case "OPEN":
                setStatusBudgetSelect("em aberto");
                setBudgetsFiltered(budgets.filter((b) => b.status === "OPEN"));
                break;
            case "IN_PROGRESS":
                setStatusBudgetSelect("em andamento");
                setBudgetsFiltered(budgets.filter((b) => b.status === "IN_PROGRESS"));
                break;
            case "CLOSED":
                setStatusBudgetSelect("finalizados");
                setBudgetsFiltered(budgets.filter((b) => b.status === "CLOSED"));
                break;
            case "CANCELED":
                setStatusBudgetSelect("cancelados");
                setBudgetsFiltered(budgets.filter((b) => b.status === "CANCELED"));
                break;
        }
    }

    function handleNavigateBudget(idBudget: number) {
        navigate('budget', { idBudget });
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
                    keyExtractor={budget => budget.id.toString()}
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