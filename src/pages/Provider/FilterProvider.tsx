import { ListRenderItemInfo } from 'react-native';
import { Text, VStack, HStack, IconButton, Box, FlatList } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';
import { ArrowLeft } from 'phosphor-react-native';

import { Provider } from '../../types/user';

import { SelectServiceType } from '../../features/createBudget';
import { SimpleProviderCard } from '../../features/searchProvider';

export function FilterProvider() {
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

    const route = useRoute<RouteProp<propsNavigationStack, "filterProvider">>();
    const navigation = useNavigation<propsStack>();

    function renderProviderCard({ item }: ListRenderItemInfo<Provider>) {
        return <SimpleProviderCard
            mx={5}
            mt={3}
            data={item}
            onPress={() => navigation.navigate("provider", { idProvider: item.id })}
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
            />

            <FlatList
                mt={5}
                bg="background"
                data={providers}
                keyExtractor={provider => provider.id.toString()}
                renderItem={renderProviderCard}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    );
}