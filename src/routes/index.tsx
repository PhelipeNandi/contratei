import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/auth';
import { Loading } from "../components/Loading";

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { isAuthenticated, isLoading } = useAuth();

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