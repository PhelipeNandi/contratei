import { useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { VStack, FlatList, Center, Text, useTheme, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from 'react-query';
import { Briefcase, Warning } from 'phosphor-react-native';

import { Budget } from '../../types/budget';
import { useAuthContext } from '../../hooks/useAuthContext';
import { propsStack } from '../../routes/Navigators/Models';
import { normalizeStatus } from '../../utils/formatStrings';

import { Header } from '../../components/ui/Header';
import { Loading } from '../../components/ui/Loading';
import { SelectStatusBudget, BudgetCardDetails } from '../../features/myBudgets';
import { searchMyBudgets } from '../../features/myBudgets/services/searchMyBudgets';

export function MyBudgets() {
    const { colors } = useTheme();
    const { user, isConsumer } = useAuthContext();
    const { navigate } = useNavigation<propsStack>();
    const [labelBudgetQuantity, setLabelBudgetQuantity] = useState<string>("Quantidade: 0");
    const [statusBudgetSelect, setStatusBudgetSelect] = useState<string>();

    const {
        data,
        isSuccess,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(["myBudgets", statusBudgetSelect],
        ({ queryKey, pageParam = 0 }) => searchMyBudgets(pageParam, user.id, queryKey[1], isConsumer), {
        getNextPageParam: (page) => {
            if (page.currentPage < page.totalPages) {
                return page.currentPage + 1;
            }
            return false;
        }
    });

    function handleLabelBudgetQuantity() {
        if (data != null) {
            setLabelBudgetQuantity("Quantidade: " + data.pages.map((budgetResponse) => budgetResponse.budgets).flat()?.length);
        }
    }

    useEffect(() => {
        handleLabelBudgetQuantity();
    }, [isSuccess, statusBudgetSelect]);

    function handleFetchNextPaget() {
        if (hasNextPage) {
            fetchNextPage();
            handleLabelBudgetQuantity();
        }
    }

    function renderBudgetCard({ item }: ListRenderItemInfo<Budget>) {
        return <BudgetCardDetails data={item} onPress={() => handleNavigateBudget(item.id)} />
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
                    onValueChange={(selectValue) => setStatusBudgetSelect(selectValue)}
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

                {
                    isLoading &&
                    <Loading />
                }

                {
                    isError &&
                    <Center flex={1}>
                        <Warning color={colors.red[600]} size={32} />
                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                            Aconteceu um erro ao buscar {"\n"}
                            seus orçamentos
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
                                    Você ainda não possui orçamentos {"\n"}
                                    {normalizeStatus(statusBudgetSelect).toLowerCase()}
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
        </VStack >
    );
}