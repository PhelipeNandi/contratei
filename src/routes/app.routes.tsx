import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../screens/SplashScreen';
import { SignIn } from '../screens/SignIn';
import { RegisterAccount } from '../screens/RegisterAccount';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="splashScreen" component={SplashScreen} />
            <Screen name="signIn" component={SignIn} />
            <Screen name="registerAccount" component={RegisterAccount} />
        </Navigator>
    );
}