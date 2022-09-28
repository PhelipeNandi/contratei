import { VStack, ScrollView, Collapse } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { UserAddress } from '../../../types/user';
import { propsStack } from '../../../routes/Navigators/Models';
import { useAddressContext } from '../../../hooks/useAddressContext';

import { Header } from '../../../components/ui/Header';
import { Alert } from '../../../components/form/Alert';
import { AddressCard } from '../../../features/addresses';
import { Button } from '../../../components/ui/Button';

export function Addresses() {
    const navigation = useNavigation<propsStack>();

    const userAddresses: UserAddress[] = [
        {
            id: 3,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan",
            isMainAddress: true
        }, {
            id: 2,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan",
            isMainAddress: false
        },
        {
            id: 1,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan",
            isMainAddress: false
        }
    ]

    const addressContext = useAddressContext();

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

            <VStack mt={3} flex={1}>
                <ScrollView>
                    {
                        userAddresses.map((userAddress) => {
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

                </ScrollView>

            </VStack>

        </VStack>
    );
}