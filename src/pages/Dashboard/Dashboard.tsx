import { useEffect, useState } from 'react';
import { VStack, Text, HStack, Avatar, FlatList, Center, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Briefcase, Clipboard, MagnifyingGlass } from 'phosphor-react-native';

import { ButtonNavigation } from '../../features/dashboard';
import { BudgetCardDetails } from '../../features/myBudgets/components/BudgetCardDetails';
import { CardNavigation } from '../../components/ui/CardNavigation';
import { useAuthContext } from '../../hooks/useAuthContext';
import { searchMyBudgets } from '../../features/myBudgets/services/searchMyBudgets';

import { Budget } from '../../types/budget';
import { propsTab } from '../../routes/Navigators/Models';

export function Dashboard() {
    const { colors } = useTheme();
    const { user } = useAuthContext();
    const { navigate } = useNavigation<propsTab>();
    const [budgets, setBudgets] = useState<Budget[]>();

    useEffect(() => {
        async function handleSearchMyBudgets() {
            try {
                await searchMyBudgets("0", "5", user.id)
                    .then((budgets) => {
                        setBudgets(budgets);
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

    return (
        <VStack flex={1} bg="primary.700">
            <HStack
                pt={20}
                px={12}
                pb={8}
                bg="primary.700"
            >
                <Avatar bg="gray.500" size="lg" source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }} />

                <VStack pl={8}>
                    <HStack>
                        <Text fontFamily="body" fontSize="title" color="white">
                            Olá {user.firstName},
                        </Text>
                    </HStack>
                    <Text fontFamily="mono" fontSize="md" color="white">
                        bem vindo de volta!
                    </Text>
                </VStack>
            </HStack>

            <VStack flex={1} roundedTop={32} px={8} bg="background">

                <HStack mt={3} justifyContent="space-between">
                    <CardNavigation
                        title={`Meus\nOrçamentos`}
                        colorCard="red.500"
                        colorFont="white"
                        icon={Briefcase}
                        onPress={() => navigate('myBudgetsTab')}
                    />

                    <CardNavigation
                        title={`Criar\nOrçamento`}
                        colorCard="primary.700"
                        colorFont="white"
                        icon={Clipboard}
                        onPress={() => navigate('createBudgetTab')}
                    />
                </HStack>

                <ButtonNavigation
                    mt={2}
                    title="Qual tipo de serviço?"
                    icon={MagnifyingGlass}
                    onPress={() => navigate('searchProviderTab')}
                />

                <Text
                    mt={6}
                    mb={3}
                    fontFamily="body"
                    fontSize="lg"
                    color="primary.700"
                >
                    Últimos Serviços
                </Text>

                <FlatList
                    data={budgets}
                    keyExtractor={budget => budget.id.toString()}
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

            </VStack >
        </VStack >
    );
}