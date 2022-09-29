import { VStack, ScrollView, Collapse, Center, Text, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { Warning, AddressBook } from 'phosphor-react-native';

import { propsStack } from '../../../routes/Navigators/Models';
import { useAddressContext } from '../../../hooks/useAddressContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { Header } from '../../../components/ui/Header';
import { Alert } from '../../../components/form/Alert';
import { Button } from '../../../components/ui/Button';
import { Loading } from '../../../components/ui/Loading';
import { AddressCard, searchAddress } from '../../../features/addresses';

export function Addresses() {
    const navigation = useNavigation<propsStack>();
    const addressContext = useAddressContext();
    const { user } = useAuthContext();
    const { colors } = useTheme();

    const {
        data,
        isLoading,
        isSuccess,
        isError
    } = useQuery('myAddresses', () => searchAddress(user));

    return (
        <VStack flex={1} bg="background">
            <Header title="Endereços" />

            <Collapse mt={2} isOpen={addressContext.isModalOpen}>
                <Alert
                    status="success"
                    header="Cadastro realizado com sucesso!"
                    onPress={() => addressContext.setIsModalOpen(false)}
                />
            </Collapse>

            <VStack mt={5} flex={1}>
                {
                    isLoading &&
                    <Loading />
                }

                {
                    isError &&
                    <Center flex={1}>
                        <Warning color={colors.red[600]} size={32} />
                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                            Aconteceu um erro ao buscar seus enderços
                        </Text>
                    </Center>
                }

                {
                    !isLoading && !isError && (data === undefined || data.length === 0) &&
                    <Center flex={1}>
                        <AddressBook color={colors.primary[700]} size={32} />
                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                            Você ainda não possui nenhum {"\n"}
                            endereço cadastrado
                        </Text>
                    </Center>
                }

                {
                    isSuccess &&
                    data.map((userAddress) => {
                        return (
                            <AddressCard
                                px={2}
                                mb={3}
                                data={userAddress}
                                key={userAddress.id.toString()}
                                onPress={() => {
                                    addressContext.setAddress(userAddress);
                                    addressContext.setIsEditing(true);
                                    navigation.navigate("addNewAddress");
                                }}
                            />
                        )
                    })
                }

                <Button
                    mx={5}
                    mt={2}
                    mb={5}
                    title="Adicionar"
                    variant="primary"
                    onPress={() => {
                        addressContext.setAddress(null);
                        addressContext.setIsEditing(false);
                        navigation.navigate("addNewAddress");
                    }}
                />
            </VStack>
        </VStack>
    );
}