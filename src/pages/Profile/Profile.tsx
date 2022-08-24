import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../hooks/useAuthContext';

import { Button } from '../../components/ui/Button';

export function Profile() {
    const { logOut } = useAuthContext();
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