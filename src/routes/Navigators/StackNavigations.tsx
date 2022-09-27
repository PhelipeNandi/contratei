import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { propsNavigationStack } from './Models';
import {
    SplashScreen,
    SignIn,
    RegisterAccount,
    Dashboard,
    SearchProvider,
    FilterProvider,
    Provider,
    MyBudgets,
    Budget,
    CreateBudget,
    Profile,
    PersonalInformation,
    Payments,
    AddNewCreditCard,
    Notifications,
    Settings,
    CommentsProvider,
    CreateNewCommentProvider,
} from '../../pages';
import { ProviderProvider } from '../../contexts/authProvider';

const Stack = createNativeStackNavigator<propsNavigationStack>();

export function LoginNavigation() {
    return (
        <Stack.Navigator initialRouteName="searchProvider" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="searchProvider" component={SearchProvider} />
            <Stack.Screen name="filterProvider" component={FilterProvider} />
            <Stack.Screen name="provider" component={Provider} />
            <Stack.Screen name="splashScreen" component={SplashScreen} />
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="registerAccount" component={RegisterAccount} />
        </Stack.Navigator>
    )
}

export function DashboardNavigation() {
    return (
        <Stack.Navigator initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="dashboard" component={Dashboard} />
            <Stack.Screen name="myBudgets" component={MyBudgets} />
            <Stack.Screen name="budget" component={Budget} />
            <Stack.Screen name="createBudget" component={CreateBudget} />
            <Stack.Screen name="searchProvider" component={SearchProvider} />
        </Stack.Navigator>
    )
}

export function BudgetNavigation() {
    return (
        <Stack.Navigator initialRouteName="myBudgets" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="myBudgets" component={MyBudgets} />
            <Stack.Screen name="budget" component={Budget} />
        </Stack.Navigator>
    )
}

export function SearchProviderNavigation() {
    return (
        <ProviderProvider>
            <Stack.Navigator initialRouteName="searchProvider" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="searchProvider" component={SearchProvider} />
                <Stack.Screen name="filterProvider" component={FilterProvider} />
                <Stack.Screen name="provider" component={Provider} />
                <Stack.Screen name="commentsProvider" component={CommentsProvider} />
                <Stack.Screen name="createNewCommentProvider" component={CreateNewCommentProvider} />
            </Stack.Navigator>
        </ProviderProvider>
    )
}

export function CreateBudgetNavigation() {
    return (
        <Stack.Navigator initialRouteName="createBudget" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="createBudget" component={CreateBudget} />
        </Stack.Navigator>
    )
}

export function ProfileNavigation() {
    return (
        <Stack.Navigator initialRouteName="profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="personalInformation" component={PersonalInformation} />
            <Stack.Screen name="payments" component={Payments} />
            <Stack.Screen name="addNewCreditCard" component={AddNewCreditCard} />
            <Stack.Screen name="notifications" component={Notifications} />
            <Stack.Screen name="settings" component={Settings} />
        </Stack.Navigator>
    )
}