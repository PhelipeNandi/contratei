import { VStack, Avatar, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Bell, Gear, User, SignOut, Cardholder } from 'phosphor-react-native';

import { MenuNavigation } from '../../components/ui/MenuNavigation';
import { Button } from '../../components/ui/Button';

export function Profile() {
    const { user, logOut } = useAuthContext();
    const navigation = useNavigation();

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
                    />

                    <MenuNavigation
                        mt={8}
                        title="Pagamentos"
                        icon={Cardholder}
                    />

                    <MenuNavigation
                        mt={8}
                        title="Notificações"
                        icon={Bell}
                    />

                    <MenuNavigation
                        mt={8}
                        title="Configurações"
                        icon={Gear}
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