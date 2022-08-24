import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Briefcase, Clipboard, User } from 'phosphor-react-native';

import { Dashboard } from '../pages/Dashboard/Dashboard';
import { SearchProvider } from '../pages/Provider/SearchProvider';
import { MyBudgets } from '../pages/Budget/MyBudgets';
import { CreateBudget } from '../pages/Budget/CreateBudget';
import { Profile } from '../pages/Profile/Profile';

import { ButtonCreateBudget } from '../features/createBudget';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => {
    return (
        <Stack.Navigator initialRouteName='dashboard' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="dashboard" component={Dashboard} />
            <Stack.Screen name="searchProvider" component={SearchProvider} />
            <Stack.Screen name="myBudgets" component={MyBudgets} />
            <Stack.Screen name="createBudget" component={CreateBudget} />
        </Stack.Navigator>
    )
}

export function AuthRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff'
                },
                tabBarActiveTintColor: '#3A539B',
                tabBarInactiveTintColor: '#000000'
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardStack}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <House size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />

            <Tab.Screen
                name="Meus Orçamentos"
                component={MyBudgets}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Briefcase size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />

            <Tab.Screen
                name="Buscar Fornecedor"
                component={SearchProvider}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <ButtonCreateBudget size={size} isFocused={focused} />
                    )
                }}
            />

            <Tab.Screen
                name="Criar Orçamento"
                component={CreateBudget}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Clipboard size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <User size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}