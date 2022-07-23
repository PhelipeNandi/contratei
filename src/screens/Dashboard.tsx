import { useContext } from 'react';
import { VStack, Text } from 'native-base';
import { Button } from '../components/Button';
import { AuthContext } from '../contexts/auth';

export function Dashboard() {
    const { logOut } = useContext(AuthContext);

    function handleLogOut() {
        logOut();
    }

    return (
        <VStack flex={1} justifyContent="center" alignItems="center">
            <Text>
                Sou eu
            </Text>

            <Button
                mt={5}
                title="Logout"
                onPress={handleLogOut}
            />
        </VStack>
    );
}