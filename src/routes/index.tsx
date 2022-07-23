import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../contexts/auth';
import { Loading } from "../components/Loading";

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

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