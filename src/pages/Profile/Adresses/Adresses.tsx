import { VStack, ScrollView, Collapse } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { UserAdress } from '../../../types/user';
import { propsStack } from '../../../routes/Navigators/Models';
import { useAdressContext } from '../../../hooks/useAdressContext';

import { Header } from '../../../components/ui/Header';
import { Alert } from '../../../components/form/Alert';
import { AdressCard } from '../../../features/adresses';
import { Button } from '../../../components/ui/Button';

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
            street: "José Bressan",
            isMainAdress: true
        }, {
            id: 2,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan",
            isMainAdress: false
        },
        {
            id: 1,
            city: "Tubarão",
            district: "Monte Castelo",
            numberStreet: "80",
            postCode: "88702-440",
            state: "SC",
            street: "José Bressan",
            isMainAdress: false
        }
    ]

    const adressContext = useAdressContext();

    return (
        <VStack flex={1} bg="background">
            <Header title="Endereços" />

            <Collapse mt={2} isOpen={adressContext.isModalOpen}>
                <Alert
                    status="success"
                    header="Cadastro realizado com sucesso!"
                    onPress={() => adressContext.setIsModalOpen(false)}
                />
            </Collapse>

            <VStack mt={3} flex={1}>
                <ScrollView>
                    {
                        userAdresses.map((userAdress) => {
                            return (
                                <AdressCard
                                    px={2}
                                    mb={3}
                                    data={userAdress}
                                    key={userAdress.id.toString()}
                                    onPress={() => {
                                        adressContext.setAdress(userAdress);
                                        adressContext.setIsEditing(true);
                                        navigation.navigate("addNewAdress");
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
                            adressContext.setAdress(null);
                            adressContext.setIsEditing(false);
                            navigation.navigate("addNewAdress");
                        }}
                    />

                </ScrollView>

            </VStack>

        </VStack>
    );
}