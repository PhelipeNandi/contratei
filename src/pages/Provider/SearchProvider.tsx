import { ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { HStack, Text, VStack, FlatList, ScrollView, Divider, Center, useTheme } from 'native-base';
import { Briefcase, Warning } from 'phosphor-react-native';

import { propsStack } from '../../routes/Navigators/Models';
import { Provider, ServiceType } from '../../types/provider';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProviderContext } from '../../hooks/useProviderContext';

import { Header } from '../../components/ui/Header';
import { Loading } from '../../components/ui/Loading';
import { ProviderCardDetails, searchBetterProviders, searchNewProviders, searchRandomProviders, ServiceTypeCard } from '../../features/searchProvider';

export function SearchProvider() {
    const serviceTypes: ServiceType[] = [
        {
            id: 4,
            name: "MECANICO"
        }
        , {
            id: 3,
            name: "PEDREIRO"
        }
        , {
            id: 2,
            name: "PINTOR"
        }
        , {
            id: 1,
            name: "MARCENEIRO"
        }
        , {
            id: 0,
            name: "EMPREGADO"
        }
    ]

    const { navigate } = useNavigation<propsStack>();
    const { user, isAuthenticated } = useAuthContext();
    const { searchProvider } = useProviderContext();
    const { colors } = useTheme();

    const {
        data: randomProvidersData,
        isSuccess: randomProvidersIsSuccess,
        isLoading: randomProvidersIsLoading,
        isError: randomProvidersIsError
    } = useQuery('randomProviders', () => searchRandomProviders(user, isAuthenticated));

    const {
        data: newProvidersData,
        isSuccess: newProvidersIsSuccess,
        isLoading: newProvidersIsLoading,
        isError: newProvidersIsError
    } = useQuery('newProviders', () => searchNewProviders(user, isAuthenticated));

    const {
        data: betterProvidersData,
        isSuccess: betterProvidersIsSuccess,
        isLoading: betterProvidersIsLoading,
        isError: betterProvidersIsError
    } = useQuery('betterProviders', () => searchBetterProviders(user, isAuthenticated));

    async function handleNavigateProvider(provider: Provider) {
        await searchProvider(provider.id)
            .then(() => {
                navigate("provider", { isHirable: true });
            })
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            });
    }

    function renderProviderCard({ item }: ListRenderItemInfo<Provider>) {
        return <ProviderCardDetails
            maxW={80}
            data={item}
            onPress={() => handleNavigateProvider(item)}
        />
    }

    function renderServiceTypeCard({ item }: ListRenderItemInfo<ServiceType>) {
        return <ServiceTypeCard
            serviceType={item.name}
            onPress={() => handleNavigateFilterProvider(item)}
        />
    }

    function renderProviderCardDetails({ item }: ListRenderItemInfo<Provider>) {
        return <ProviderCardDetails
            maxW={56}
            data={item}
            onPress={() => handleNavigateProvider(item)}
        />
    }

    function handleNavigateFilterProvider(selectServiceType: ServiceType) {
        navigate("filterProvider", { serviceType: selectServiceType });
    }

    return (
        <VStack flex={1} bg="primary.700">

            {
                !isAuthenticated &&
                <Header />
            }

            <ScrollView>

                <VStack bg="background">
                    <HStack
                        mt={!isAuthenticated ? 5 : 12}
                        px={5}
                    >
                        <Text fontFamily="body" fontSize={!isAuthenticated ? "lg" : "subTitle"} color="gray.400">
                            Encontre {""}
                        </Text>
                        <Text fontFamily="body" fontSize={!isAuthenticated ? "lg" : "subTitle"} color="primary.700">
                            Fornecedores
                        </Text>
                    </HStack>

                    {
                        randomProvidersIsLoading &&
                        <Loading my={12} />
                    }

                    {
                        randomProvidersIsError &&
                        <Center mt={5} flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao  {"\n"}
                                buscar os fornecedores
                            </Text>
                        </Center>
                    }

                    {
                        randomProvidersIsSuccess &&
                        <FlatList
                            mt={5}
                            horizontal={true}
                            data={randomProvidersData}
                            keyExtractor={provider => provider.id.toString()}
                            renderItem={renderProviderCard}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            ListEmptyComponent={() => (
                                <Center mt={2} flex={1}>
                                    <Briefcase color={colors.gray[300]} size={32} />
                                    <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                        Não foi encontrado {"\n"}
                                        nenhum fornecedor
                                    </Text>
                                </Center>
                            )}
                        />
                    }

                    <Divider mt={5} />

                    <HStack
                        mt={4}
                        px={5}
                    >
                        <Text fontFamily="body" fontSize="md" color="gray.400">
                            Tipos de {""}
                        </Text>
                        <Text fontFamily="body" fontSize="md" color="primary.700">
                            Serviço
                        </Text>
                    </HStack>

                    <FlatList
                        m={2}
                        mt={4}
                        bg="background"
                        horizontal={true}
                        data={serviceTypes}
                        keyExtractor={serviceType => serviceType.id.toString()}
                        renderItem={renderServiceTypeCard}
                        showsHorizontalScrollIndicator={false}
                    />

                    <Divider mt={5} />

                    <HStack
                        mt={4}
                        px={5}
                    >
                        <Text fontFamily="body" fontSize="md" color="gray.400">
                            Novos {""}
                        </Text>
                        <Text fontFamily="body" fontSize="md" color="primary.700">
                            fornecedores
                        </Text>
                    </HStack>

                    {
                        newProvidersIsLoading &&
                        <Loading my={12} />
                    }

                    {
                        newProvidersIsError &&
                        <Center my={5} flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao  {"\n"}
                                buscar os fornecedores
                            </Text>
                        </Center>
                    }

                    {
                        newProvidersIsSuccess &&
                        <FlatList
                            my={5}
                            horizontal={true}
                            data={newProvidersData}
                            keyExtractor={provider => provider.id.toString()}
                            renderItem={renderProviderCardDetails}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            ListEmptyComponent={() => (
                                <Center mt={2} flex={1}>
                                    <Briefcase color={colors.gray[300]} size={32} />
                                    <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                        Não foi encontrado {"\n"}
                                        nenhum fornecedor
                                    </Text>
                                </Center>
                            )}
                        />
                    }

                    <HStack
                        mt={4}
                        px={5}
                    >
                        <Text fontFamily="body" fontSize="md" color="gray.400">
                            Top {""}
                        </Text>
                        <Text fontFamily="body" fontSize="md" color="primary.700">
                            fornecedores
                        </Text>
                    </HStack>

                    {
                        betterProvidersIsLoading &&
                        <Loading my={12} />
                    }

                    {
                        betterProvidersIsError &&
                        <Center my={5} flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text my={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao  {"\n"}
                                buscar os fornecedores
                            </Text>
                        </Center>
                    }

                    {
                        betterProvidersIsSuccess &&
                        <FlatList
                            my={5}
                            horizontal={true}
                            data={betterProvidersData}
                            keyExtractor={provider => provider.id.toString()}
                            renderItem={renderProviderCardDetails}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            ListEmptyComponent={() => (
                                <Center mt={2} flex={1}>
                                    <Briefcase color={colors.gray[300]} size={32} />
                                    <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                        Não foi encontrado {"\n"}
                                        nenhum fornecedor
                                    </Text>
                                </Center>
                            )}
                        />
                    }

                </VStack>
            </ScrollView>
        </VStack>
    );
}