import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Briefcase, Clipboard, User } from 'phosphor-react-native';
import { propsNavigationTab } from './Models';

import {
    DashboardNavigation,
    BudgetNavigation,
    CreateBudgetNavigation,
    ProfileNavigationProvider,
    SearchBudgetsNavigation
} from './StackNavigations';

const Tab = createBottomTabNavigator<propsNavigationTab>();

export function ShowProviderBottomTabs() {
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
                tabBarInactiveTintColor: '#3A539B'
            }}
        >
            <Tab.Screen
                name="dashboardTab"
                component={DashboardNavigation}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <House size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />

            <Tab.Screen
                name="myBudgetsTab"
                component={BudgetNavigation}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Briefcase size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />

            <Tab.Screen
                name="searchBudgetsTab"
                component={SearchBudgetsNavigation}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Clipboard size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />

            <Tab.Screen
                name="profileTab"
                component={ProfileNavigationProvider}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <User size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}