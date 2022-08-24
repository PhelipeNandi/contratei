import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from '../hooks/useAuthContext';
import { Loading } from "../components/ui/Loading";

import { AppRoutes } from './app.routes';
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
                    : <AppRoutes />
            }
        </NavigationContainer>
    );
}