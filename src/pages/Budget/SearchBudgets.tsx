import { useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { VStack, Center, Text, FlatList, useTheme } from 'native-base';
import { useInfiniteQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { Warning, Briefcase } from 'phosphor-react-native';

import { Budget } from '../../types/budget';
import { useAuthContext } from '../../hooks/useAuthContext';
import { propsStack } from '../../routes/Navigators/Models';
import { normalizePriorityLevel } from '../../utils/formatStrings';

import { Header } from '../../components/ui/Header';
import { Loading } from '../../components/ui/Loading';
import { BudgetCardDetails } from '../../features/myBudgets';
import { SelectPriorityLevel, searchBudgets } from '../../features/searchBudgets';

export function SearchBudgets() {
    const { colors } = useTheme();
    const { user } = useAuthContext();
    const { navigate } = useNavigation<propsStack>();
    const [priorityLevelSelect, setPriorityLevelSelect] = useState<string>();

    const {
        data,
        isSuccess,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(["openBudgets", priorityLevelSelect],
        ({ queryKey, pageParam = 0 }) => searchBudgets(pageParam, user.id, queryKey[1]), {
        getNextPageParam: (page) => {
            if (page.currentPage < page.totalPages) {
                return page.currentPage + 1;
            }
            return false;
        }
    });

    function handleFetchNextPaget() {
        if (hasNextPage) {
            fetchNextPage();
        }
    }

    function renderBudgetCard({ item }: ListRenderItemInfo<Budget>) {
        return <BudgetCardDetails data={item} onPress={() => handleNavigateBudget(item.id)} />
    }

    function handleNavigateBudget(idBudget: number) {
        navigate('budget', { idBudget });
    }

    return (
        <VStack flex={1}>
            <Header title="Buscar Orçamentos" />

            <VStack flex={1} bg="background">

                <SelectPriorityLevel
                    my={2}
                    mx={3}
                    onValueChange={(selectValue) => setPriorityLevelSelect(selectValue)}
                />

                {
                    isLoading &&
                    <Loading />
                }

                {
                    isError &&
                    <Center flex={1}>
                        <Warning color={colors.red[600]} size={32} />
                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                            Aconteceu um erro ao buscar orçamentos
                        </Text>
                    </Center>
                }

                {
                    isSuccess &&
                    <FlatList
                        px={4}
                        data={data.pages.map((budgetResponse) => budgetResponse.budgets).flat()}
                        keyExtractor={budget => budget.id.toString()}
                        renderItem={renderBudgetCard}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <Center mt={40}>
                                <Briefcase color={colors.primary[700]} size={32} />
                                <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                    Não existe nenhum orçamento {"\n"}
                                    cadastrado para a prioridade de {"\n"}
                                    {normalizePriorityLevel(priorityLevelSelect).toLowerCase()}
                                </Text>
                            </Center>
                        )}
                        onEndReached={handleFetchNextPaget}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={
                            isFetchingNextPage && <Loading my={10} />
                        }
                    />
                }

            </VStack>
        </VStack>
    );
}