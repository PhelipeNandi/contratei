import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Dashboard } from '../screens/Dashboard';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="dashboard" component={Dashboard} />
        </Navigator>
    );
}