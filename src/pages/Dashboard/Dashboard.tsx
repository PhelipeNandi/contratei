import { VStack, Text, HStack, Avatar, FlatList, Center, useTheme } from 'native-base';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { Briefcase, Clipboard, MagnifyingGlass, Warning } from 'phosphor-react-native';

import { ButtonNavigation } from '../../features/dashboard';
import { BudgetCardDetails } from '../../features/myBudgets/components/BudgetCardDetails';
import { CardNavigation } from '../../components/ui/CardNavigation';
import { useAuthContext } from '../../hooks/useAuthContext';
import { searchMyBudgets } from '../../features/myBudgets/services/searchMyBudgets';
import { Loading } from '../../components/ui/Loading';
import { propsStack, propsTab } from '../../routes/Navigators/Models';

export function Dashboard() {
    const { colors } = useTheme();
    const { user, isConsumer } = useAuthContext();
    const { navigate: navigateTab } = useNavigation<propsTab>();
    const { navigate: navigateStack } = useNavigation<propsStack>();

    const {
        data,
        isSuccess,
        isLoading,
        isError
    } = useQuery(["budgets", user.id], () => searchMyBudgets(0, user.id, "ALL", isConsumer), {
        enabled: isConsumer != null
    });

    return (
        <VStack flex={1} bg="primary.700">
            <Center>
                <HStack
                    pt={20}
                    pb={8}
                    bg="primary.700"
                >
                    <Avatar
                        bg="gray.500"
                        size="lg"
                        source={{
                            uri: user.profilePicture ? `data:image/gif;base64,${user.profilePicture}`
                                : "https://avatars.githubusercontent.com/u/46757393?v=4"
                        }}
                    />

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
            </Center>

            <VStack flex={1} roundedTop={32} px={5} bg="background">

                <HStack mt={3} mx={2} justifyContent="space-between">
                    <CardNavigation
                        title={`Meus\nOrçamentos`}
                        colorCard="red.700"
                        colorFont="white"
                        icon={Briefcase}
                        onPress={() => navigateTab('myBudgetsTab')}
                    />

                    {
                        isConsumer
                            ? <CardNavigation
                                title={`Criar\nOrçamento`}
                                colorCard="primary.700"
                                colorFont="white"
                                icon={Clipboard}
                                onPress={() => navigateTab('createBudgetTab')}
                            />
                            : <CardNavigation
                                title={`Buscar\nOrçamentos`}
                                colorCard="primary.700"
                                colorFont="white"
                                icon={Clipboard}
                                onPress={() => navigateTab('searchBudgetsTab')}
                            />
                    }

                </HStack>

                {
                    isConsumer &&
                    <ButtonNavigation
                        mt={2}
                        title="Qual tipo de serviço?"
                        icon={MagnifyingGlass}
                        onPress={() => navigateTab('searchProviderTab')}
                    />
                }

                <Text
                    mt={isConsumer ? 6 : 10}
                    mb={3}
                    fontFamily="body"
                    fontSize="lg"
                    color="primary.700"
                >
                    Últimos Serviços
                </Text>

                {
                    isLoading || isConsumer === null &&
                    <Loading />
                }

                {
                    isError &&
                    <Center flex={1}>
                        <Warning color={colors.red[600]} size={32} />
                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                            Aconteceu um erro ao buscar seus orçamentos
                        </Text>
                    </Center>
                }

                {
                    isSuccess &&
                    <FlatList
                        data={data.budgets}
                        keyExtractor={(budget) => budget.id.toString()}
                        renderItem={({ item }) => <BudgetCardDetails data={item} onPress={() => navigateStack('budget', { idBudget: item.id })} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ListEmptyComponent={() => (
                            <Center flex={1}>
                                <Clipboard color={colors.gray[300]} size={32} />
                                <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                    Você ainda não possui orçamentos
                                </Text>
                            </Center>
                        )}
                    />
                }

            </VStack>
        </VStack >
    );
}