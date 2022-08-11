import { VStack, Text } from 'native-base';

import { Button } from '../components/Button';
import { useAuth } from '../contexts/auth';

export function Dashboard() {
    const { logOut, user } = useAuth();

    function handleLogOut() {
        logOut();
    }

    return (
        <VStack flex={1} justifyContent="center" alignItems="center">
            <Text>
                {user.token}
            </Text>

            <Button
                mt={5}
                title="Logout"
                onPress={handleLogOut}
            />
        </VStack>
    );
}