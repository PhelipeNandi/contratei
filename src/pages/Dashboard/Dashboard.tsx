import { VStack, Text, HStack, Avatar, FlatList, Center, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Briefcase, Clipboard, MagnifyingGlass } from 'phosphor-react-native';

import { ButtonNavigation } from '../../features/dashboard';
import { BudgetCardDetails } from '../../components/ui/BudgetCardDetails';
import { CardNavigation } from '../../components/ui/CardNavigation';
import { useAuthContext } from '../../hooks/useAuthContext';

import { Budget } from '../../types/budget';

export function Dashboard() {
    const navigation = useNavigation();
    const { user } = useAuthContext();
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
                        onPress={() => navigation.navigate('myBudgets')}
                    />

                    <CardNavigation
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