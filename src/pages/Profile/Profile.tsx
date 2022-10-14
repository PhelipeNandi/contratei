import { VStack, Avatar, Text, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Bell, Gear, User, SignOut, Cardholder, AddressBook, UserCircle } from 'phosphor-react-native';

import { MenuNavigation } from '../../components/ui/MenuNavigation';
import { propsStack } from '../../routes/Navigators/Models';
import { useProviderContext } from '../../hooks/useProviderContext';

export function Profile() {
    const { user, logOut, isConsumer } = useAuthContext();
    const navigation = useNavigation<propsStack>();
    const { searchProvider } = useProviderContext();

    async function handleNavigateProvider() {
        await searchProvider(user.id)
            .then(() => {
                navigation.navigate("provider", { isHirable: true });
            })
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            });
    }

    return (
        <VStack flex={1} bg="primary.700" pt={32}>
            <VStack
                flex={1}
                px={8}
                roundedTop={32}
                bg="background"
            >
                <VStack bottom={20}>
                    <Avatar
                        alignSelf="center"
                        bg="gray.500"
                        size="2xl"
                        borderWidth={5}
                        borderColor="primary.700"
                        source={{
                            uri: user.profilePicture ? `data:image/gif;base64,${user.profilePicture}`
                                : "https://avatars.githubusercontent.com/u/46757393?v=4"
                        }}
                    />

                    <Text mt={3} textAlign="center" fontFamily="body" fontSize="subTitle" color="primary.700">
                        {user.firstName} {user.lastName}
                    </Text>

                    <ScrollView>
                        {
                            isConsumer
                                ? <MenuNavigation
                                    mt={7}
                                    title="Informações Pessoais"
                                    icon={User}
                                    onPress={() => navigation.navigate('personalInformation')}
                                />
                                : <MenuNavigation
                                    mt={7}
                                    title="Perfil"
                                    icon={UserCircle}
                                    onPress={() => handleNavigateProvider()}
                                />
                        }

                        <MenuNavigation
                            mt={4}
                            title="Pagamentos"
                            icon={Cardholder}
                            onPress={() => navigation.navigate('payments')}
                        />

                        <MenuNavigation
                            mt={4}
                            title="Endereços"
                            icon={AddressBook}
                            onPress={() => navigation.navigate('addressNavigation')}
                        />

                        <MenuNavigation
                            mt={4}
                            title="Notificações"
                            icon={Bell}
                            onPress={() => navigation.navigate('notifications')}
                        />

                        <MenuNavigation
                            mt={4}
                            title="Configurações"
                            icon={Gear}
                            onPress={() => navigation.navigate('settings')}
                        />

                        <MenuNavigation
                            my={4}
                            title="Sair"
                            icon={SignOut}
                            onPress={logOut}
                        />
                    </ScrollView>
                </VStack>
            </VStack>
        </VStack >
    );
}