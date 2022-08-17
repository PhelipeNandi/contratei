import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/auth';

import { Button } from '../components/Button';

export function Profile() {
    const { logOut } = useAuth();
    const navigation = useNavigation();

    function handleLogOut() {
        logOut();
    }

    return (
        <VStack flex={1} justifyContent="center" >
            <Button
                mx={8}
                mb={2}
                title="Logout"
                onPress={logOut}
            />
        </VStack >
    );
}