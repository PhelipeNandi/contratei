import { ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HStack, Text, VStack, FlatList, ScrollView, Divider } from 'native-base';

import { Provider, ServiceType } from '../../types/provider';
import { useAuthContext } from '../../hooks/useAuthContext';
import { propsStack } from '../../routes/Navigators/Models';

import { ProviderCardDetails, ServiceTypeCard } from '../../features/searchProvider';
import { Header } from '../../components/ui/Header';
import { useProviderContext } from '../../hooks/useProviderContext';

export function SearchProvider() {
    const providers: Provider[] = [
        {
            id: 5,
            serviceType: 'MECANICO',
            firstName: 'Fornecedor',
            lastName: '5',
            contactNumber: '(48) 99999-9999',
            cpf: '223.642.369-16',
            email: 'mecanico@provider.com',
            description: 'Descrição do Mecanico',
            kmWorkRange: '50.0',
            hourValue: '100.00',
        }
        , {
            id: 4,
            serviceType: 'PEDREIRO',
            firstName: 'Fornecedor',
            lastName: '4',
            contactNumber: '(48) 99999-9999',
            cpf: '177.607.715-68',
            email: 'pedreiro@provider.com',
            description: 'Descrição do Pedreiro',
            kmWorkRange: '50.0',
            hourValue: '100.00',
        }
        , {
            id: 3,
            serviceType: 'PINTOR',
            firstName: 'Fornecedor',
            lastName: '3',
            contactNumber: '(48) 99999-9999',
            cpf: '362.284.438-87',
            email: 'pintor@provider.com',
            description: 'Descrição do Pintor',
            kmWorkRange: '50.0',
            hourValue: '100.00',
        }
        , {
            id: 2,
            serviceType: 'MARCENEIRO',
            firstName: 'Fornecedor',
            lastName: '2',
            contactNumber: '(48) 99999-9999',
            cpf: '347.185.723-04',
            email: 'marceneiro@provider.com',
            description: 'Descrição do Marceneiro',
            kmWorkRange: '50.0',
            hourValue: '100.00',
        }
        , {
            id: 1,
            serviceType: 'EMPREGRADO',
            firstName: 'Fornecedor',
            lastName: '1',
            contactNumber: '(48) 99999-9999',
            cpf: '077.321.526-38',
            email: 'empregado@provider.com',
            description: 'Descrição do Empregado',
            kmWorkRange: '50.0',
            hourValue: '100.00',
        }
    ]

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
    const { isAuthenticated } = useAuthContext();
    const { searchProvider } = useProviderContext();

    async function handleNaviteProvider(provider: Provider) {
        await searchProvider(provider.id)
            .then(() => {
                navigate("provider");
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
            onPress={() => handleNaviteProvider(item)}
        />
    }

    function renderServiceTypeCard({ item }: ListRenderItemInfo<ServiceType>) {
        return <ServiceTypeCard
            onPress={() => handleNavigateFilterProvider(item)} serviceType={item.name}
        />
    }

    function renderProviderCardDetails({ item }: ListRenderItemInfo<Provider>) {
        return <ProviderCardDetails
            maxW={48}
            data={item}
            onPress={() => handleNaviteProvider(item)}
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

                    <FlatList
                        mt={5}
                        horizontal={true}
                        data={providers}
                        keyExtractor={provider => provider.id.toString()}
                        renderItem={renderProviderCard}
                        showsHorizontalScrollIndicator={false}
                    />

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
                            Melhores preços da {""}
                        </Text>
                        <Text fontFamily="body" fontSize="md" color="primary.700">
                            semana
                        </Text>
                    </HStack>

                    <FlatList
                        my={5}
                        horizontal={true}
                        data={providers}
                        keyExtractor={provider => provider.id.toString()}
                        renderItem={renderProviderCardDetails}
                        showsHorizontalScrollIndicator={false}
                    />

                    <HStack
                        mt={4}
                        px={5}
                    >
                        <Text fontFamily="body" fontSize="md" color="gray.400">
                            Top fornecedores do {""}
                        </Text>
                        <Text fontFamily="body" fontSize="md" color="primary.700">
                            mês
                        </Text>
                    </HStack>

                    <FlatList
                        my={5}
                        horizontal={true}
                        data={providers}
                        keyExtractor={provider => provider.id.toString()}
                        renderItem={renderProviderCardDetails}
                        showsHorizontalScrollIndicator={false}
                    />
                </VStack>
            </ScrollView>
        </VStack >
    );
}