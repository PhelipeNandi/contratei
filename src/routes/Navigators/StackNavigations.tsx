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
    Proposal,
    Profile,
    PersonalInformation,
    Payments,
    AddNewCreditCard,
    Addresses,
    AddNewAddress,
    Notifications,
    Settings,
    CommentsProvider,
    CreateNewCommentProvider,
    SearchBudgets,
} from '../../pages';
import { ProviderProvider } from '../../contexts/providerContext';
import { AddressProvider } from '../../contexts/adressContext';
import { BudgetProvider } from '../../contexts/budgetContext';

const Stack = createNativeStackNavigator<propsNavigationStack>();

export function LoginNavigation() {
    return (
        <Stack.Navigator initialRouteName="searchProviderNavigation" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="searchProviderNavigation" component={SearchProviderNavigation} />
            <Stack.Screen name="splashScreen" component={SplashScreen} />
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="registerAccount" component={RegisterAccount} />
        </Stack.Navigator>
    )
}

export function DashboardNavigation() {
    return (
        <BudgetProvider>
            <ProviderProvider>
                <Stack.Navigator initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="dashboard" component={Dashboard} />
                    <Stack.Screen name="myBudgets" component={MyBudgets} />
                    <Stack.Screen name="budget" component={Budget} />
                    <Stack.Screen name="createBudget" component={CreateBudget} />
                    <Stack.Screen name="proposal" component={Proposal} />
                    <Stack.Screen name="provider" component={Provider} />
                    <Stack.Screen name="commentsProvider" component={CommentsProvider} />
                    <Stack.Screen name="createNewCommentProvider" component={CreateNewCommentProvider} />
                    <Stack.Screen name="searchProviderNavigation" component={SearchProviderNavigation} />
                </Stack.Navigator>
            </ProviderProvider>
        </BudgetProvider>
    )
}

export function BudgetNavigation() {
    return (
        <BudgetProvider>
            <ProviderProvider>
                <Stack.Navigator initialRouteName="myBudgets" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="myBudgets" component={MyBudgets} />
                    <Stack.Screen name="budget" component={Budget} />
                    <Stack.Screen name="proposal" component={Proposal} />
                    <Stack.Screen name="provider" component={Provider} />
                    <Stack.Screen name="commentsProvider" component={CommentsProvider} />
                    <Stack.Screen name="createNewCommentProvider" component={CreateNewCommentProvider} />
                </Stack.Navigator>
            </ProviderProvider>
        </BudgetProvider>
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
                <Stack.Screen name="budgetNavigation" component={BudgetNavigation} />
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

export function SearchBudgetsNavigation() {
    return (
        <BudgetProvider>
            <Stack.Navigator initialRouteName="searchBudgets" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="searchBudgets" component={SearchBudgets} />
                <Stack.Screen name="myBudgets" component={MyBudgets} />
                <Stack.Screen name="budget" component={Budget} />
                <Stack.Screen name="proposal" component={Proposal} />
            </Stack.Navigator>
        </BudgetProvider>
    )
}

export function ProfileNavigationConsumer() {
    return (
        <Stack.Navigator initialRouteName="profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="personalInformation" component={PersonalInformation} />
            <Stack.Screen name="payments" component={Payments} />
            <Stack.Screen name="addNewCreditCard" component={AddNewCreditCard} />
            <Stack.Screen name="addressNavigation" component={AddressNavigation} />
            <Stack.Screen name="notifications" component={Notifications} />
            <Stack.Screen name="settings" component={Settings} />
        </Stack.Navigator>
    )
}

export function ProfileNavigationProvider() {
    return (
        <ProviderProvider>
            <Stack.Navigator initialRouteName="profile" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="personalInformation" component={PersonalInformation} />
                <Stack.Screen name="payments" component={Payments} />
                <Stack.Screen name="provider" component={Provider} />
                <Stack.Screen name="commentsProvider" component={CommentsProvider} />
                <Stack.Screen name="createNewCommentProvider" component={CreateNewCommentProvider} />
                <Stack.Screen name="addNewCreditCard" component={AddNewCreditCard} />
                <Stack.Screen name="addressNavigation" component={AddressNavigation} />
                <Stack.Screen name="notifications" component={Notifications} />
                <Stack.Screen name="settings" component={Settings} />
            </Stack.Navigator>
        </ProviderProvider>
    )
}

export function AddressNavigation() {
    return (
        <AddressProvider>
            <Stack.Navigator initialRouteName="addresses" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="addresses" component={Addresses} />
                <Stack.Screen name="addNewAddress" component={AddNewAddress} />
            </Stack.Navigator>
        </AddressProvider>
    )
}