import { useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Text, VStack, HStack, IconButton, Box, FlatList, Center, useTheme } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';
import { ArrowLeft, SmileyMeh, Warning } from 'phosphor-react-native';
import { useInfiniteQuery } from 'react-query';

import { Provider } from '../../types/provider';
import { useAuthContext } from '../../hooks/useAuthContext';

import { Loading } from '../../components/ui/Loading';
import { SelectServiceType } from '../../features/createBudget';
import { searchProvidersByServiceType } from '../../features/filterProvider';
import { SimpleProviderCard } from '../../features/filterProvider/components/SimpleProviderCard';
import { useProviderContext } from '../../hooks/useProviderContext';

export function FilterProvider() {
    const route = useRoute<RouteProp<propsNavigationStack, "filterProvider">>();
    const navigation = useNavigation<propsStack>();
    const { searchProvider } = useProviderContext();
    const { colors } = useTheme();
    const [serviceTypeSelect, setServiceTypeSelect] = useState(route.params?.serviceType.name);
    const { isAuthenticated, user } = useAuthContext();

    const {
        data,
        isSuccess,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(["providersByServiceType", serviceTypeSelect],
        ({ queryKey, pageParam = 0 }) => searchProvidersByServiceType(pageParam, queryKey[1], isAuthenticated, user), {
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

    async function handleNavigateProvider(provider: Provider) {
        await searchProvider(provider.id)
            .then(() => {
                navigation.navigate("provider", { isHirable: true });
            })
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            });
    }

    function renderProviderCard({ item }: ListRenderItemInfo<Provider>) {
        return <SimpleProviderCard
            mx={5}
            mt={3}
            data={item}
            onPress={() => handleNavigateProvider(item)}
        />
    }

    return (
        <VStack flex={1} bg="background">
            <HStack
                mt={12}
                px={5}
                alignItems="center"
            >
                <Box maxW={16} bg="white" rounded="lg" borderWidth="1" borderColor="primary.700" shadow={1}>
                    <IconButton
                        _pressed={{ backgroundColor: "primary.700" }}
                        icon={<ArrowLeft color="black" size={24} />}
                        onPress={() => navigation.goBack()}
                    />
                </Box>
                <Text pl={4} textAlign="center" fontFamily="body" fontSize="lg" color="gray.400">
                    Filtre por {""}
                </Text>
                <Text textAlign="center" fontFamily="body" fontSize="lg" color="primary.700">
                    Tipo de Serviço
                </Text>
            </HStack>

            <SelectServiceType
                mt={3}
                mx={2}
                shadow={5}
                borderWidth={1}
                borderColor="primary.700"
                defaultValue={route.params?.serviceType.name}
                onValueChange={setServiceTypeSelect}
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
                        Aconteceu um erro ao buscar {"\n"}
                        os fornecedores
                    </Text>
                </Center>
            }

            {
                isSuccess &&
                <FlatList
                    mt={5}
                    data={data.pages.map((providerResponse) => providerResponse.providers).flat()}
                    keyExtractor={provider => provider.id.toString()}
                    renderItem={renderProviderCard}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    onEndReached={handleFetchNextPaget}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        isFetchingNextPage && <Loading my={10} />
                    }
                    ListEmptyComponent={() => (
                        <Center flex={1}>
                            <SmileyMeh color={colors.gray[300]} size={32} />
                            <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Nenhum fornecedor encontrado
                            </Text>
                        </Center>
                    )}
                />
            }


        </VStack>
    );
}