import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from '../hooks/useAuthContext';
import { Loading } from "../components/ui/Loading";

import { LoginNavigation } from './Navigators/StackNavigations';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {
                isAuthenticated
                    ? <AuthRoutes />
                    : <LoginNavigation />
            }
        </NavigationContainer>
    );
}