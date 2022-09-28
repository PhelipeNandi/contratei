import { useState, useEffect } from 'react';
import { VStack, ScrollView } from 'native-base';

import { UserAdress } from '../../../types/user';

import { Alert } from '../../../components/form/Alert';
import { AdressCard } from '../../../features/adresses';
import { Button } from '../../../components/ui/Button';
import { Header } from '../../../components/ui/Header';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/Navigators/Models';

export function Adresses() {
    const navigation = useNavigation<propsStack>();

    const userAdresses: UserAdress[] = [
        {
            id: 3,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan"
        }, {
            id: 2,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan"
        },
        {
            id: 1,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan"
        }
    ]

    const [showAlert, setShowAlert] = useState(false);

    return (
        <VStack flex={1} bg="background">
            <Header title="Endereços" />

            <VStack mt={5} flex={1}>
                <ScrollView>
                    {
                        userAdresses.map((userAdress) => {
                            return (
                                <AdressCard
                                    px={4}
                                    mb={5}
                                    data={userAdress}
                                    key={userAdress.id.toString()}
                                    onPress={() => setShowAlert(true)}
                                />
                            )
                        })
                    }

                    <Button
                        mx={5}
                        my={2}
                        title="Adicionar"
                        variant="primary"
                        onPress={() => navigation.navigate("addNewAddress")}
                    />
                </ScrollView>
            </VStack>
        </VStack>
    );
}