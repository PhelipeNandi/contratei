import { VStack, Avatar, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Bell, Gear, User, SignOut, Cardholder } from 'phosphor-react-native';

import { MenuNavigation } from '../../components/ui/MenuNavigation';
import { propsStack } from '../../routes/Navigators/Models';

export function Profile() {
    const { user, logOut } = useAuthContext();
    const navigation = useNavigation<propsStack>();

    function handleLogOut() {
        logOut();
    }

    return (
        <VStack flex={1} bg="primary.700" pt={40}>
            <VStack
                flex={1}
                roundedTop={32}
                px={8}
                bg="background"
            >
                <VStack bottom={20}>
                    <Avatar
                        alignSelf="center"
                        bg="gray.500"
                        size="2xl"
                        source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }} /
                    >

                    <Text mt={3} textAlign="center" fontFamily="body" fontSize="subTitle" color="primary.700">
                        {user.firstName} {user.lastName}
                    </Text>

                    <MenuNavigation
                        mt={12}
                        title="Informações Pessoais"
                        icon={User}
                        onPress={() => navigation.navigate('personalInformation')}
                    />

                    <MenuNavigation
                        mt={8}
                        title="Pagamentos"
                        icon={Cardholder}
                        onPress={() => navigation.navigate('payments')}
                    />

                    <MenuNavigation
                        mt={8}
                        title="Notificações"
                        icon={Bell}
                        onPress={() => navigation.navigate('notifications')}
                    />

                    <MenuNavigation
                        mt={8}
                        title="Configurações"
                        icon={Gear}
                        onPress={() => navigation.navigate('settings')}
                    />

                    <MenuNavigation
                        mt={8}
                        title="Sair"
                        icon={SignOut}
                        onPress={handleLogOut}
                    />
                </VStack>

            </VStack>
        </VStack >
    );
}