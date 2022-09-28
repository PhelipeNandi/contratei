import { useState, useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { VStack, FlatList } from 'native-base';
import { AddressBook } from 'phosphor-react-native';

import { UserAdress } from '../../../types/user';

import { AdressCard } from '../../../features/adresses';
import { Button } from '../../../components/ui/Button';
import { Header } from '../../../components/ui/Header';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/Navigators/Models';

export function Adresses() {
    const navigation = useNavigation<propsStack>();

    const userAdresses: UserAdress[] = [
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

    function renderAdressCard({ item }: ListRenderItemInfo<UserAdress>) {
        return <AdressCard data={item} />
    }

    return (
        <VStack flex={1} bg="background">
            <Header title="Endereços" />

            <VStack mt={10}>

                <FlatList
                    px={4}
                    data={userAdresses}
                    keyExtractor={userAdress => userAdress.id.toString()}
                    renderItem={renderAdressCard}
                    showsVerticalScrollIndicator={false}
                />

                <Button
                    mt={10}
                    mx={5}
                    title="Adicionar"
                    variant="PRIMARIO"
                    onPress={() => navigation.navigate("addNewAddress")}
                />

            </VStack>
        </VStack>
    );
}