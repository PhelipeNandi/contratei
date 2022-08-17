import { VStack, Text, HStack, Avatar, FlatList, Center, useTheme, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Briefcase, Clipboard, MagnifyingGlass } from 'phosphor-react-native';

import { ButtonNavigation } from '../components/ButtonNavigation';
import { MenuCard } from '../components/MenuCard';
import { useAuth } from '../contexts/auth';
import { BudgetCardDetails } from '../components/BudgetCardDetails';

import { Budget } from '../types/budget';

export function Dashboard() {
    const navigation = useNavigation();
    const { logOut, user } = useAuth();
    const { colors } = useTheme();

    const budgets: Budget[] = [
        {
            id: '5',
            title: 'Ajuste no cano da pia',
            type: 'Encanador',
            value: 'R$ 30,50',
            inicialDate: '15 AGO',
            status: 'open'
        },
        {
            id: '4',
            title: 'Faxina da casa',
            type: 'Limpeza',
            value: 'R$ 130,00',
            inicialDate: '12 AGO',
            status: 'closed'
        },
        {
            id: '3',
            title: 'Troca de chuveiro',
            type: 'Eletricista',
            value: 'R$ 48,30',
            inicialDate: '10 AGO',
            status: 'closed'
        },
        {
            id: '2',
            title: 'Limpeza no jardim',
            type: 'Jardineiro',
            value: 'R$ 70,00',
            inicialDate: '08 AGO',
            status: 'closed'
        },
        {
            id: '1',
            title: 'Troca de cor do galpão',
            type: 'Pintor',
            value: 'R$ 220,35',
            inicialDate: '02 AGO',
            status: 'open'
        }
    ]

    function handleLogOut() {
        logOut();
    }

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
                    <MenuCard
                        title={`Meus\nOrçamentos`}
                        colorCard="red.500"
                        colorFont="white"
                        icon={Briefcase}
                        onPress={() => navigation.navigate('myBudgets')}
                    />

                    <MenuCard
                        title={`Criar\nOrçamento`}
                        colorCard="primary.700"
                        colorFont="white"
                        icon={Clipboard}
                        onPress={() => navigation.navigate('createBudget')}
                    />
                </HStack>

                <ButtonNavigation
                    mt={2}
                    title="Qual tipo de serviço?"
                    icon={MagnifyingGlass}
                    onPress={() => navigation.navigate('searchProvider')}
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

            </VStack >
        </VStack >
    );
}