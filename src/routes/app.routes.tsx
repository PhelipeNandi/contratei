import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../pages/Login/SplashScreen';
import { SignIn } from '../pages/Login/SignIn';
import { RegisterAccount } from '../pages/Login/RegisterAccount';

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