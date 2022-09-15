import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Briefcase, Clipboard, User } from 'phosphor-react-native';
import { propsNavigationTab } from './Models';

import {
    DashboardNavigation,
    ProfileNavigation,
    BudgetNavigation,
    CreateBudgetNavigation,
    SearchProviderNavigation
} from './StackNavigations';
import { ButtonCreateBudget } from '../../features/createBudget';

const Tab = createBottomTabNavigator<propsNavigationTab>();

export function ShowBottomTabs() {
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
                name="searchProviderTab"
                component={SearchProviderNavigation}
                options={{
                    tabBarIcon: ({ size, focused }) => (
                        <ButtonCreateBudget size={size} isFocused={focused} />
                    )
                }}
            />

            <Tab.Screen
                name="createBudgetTab"
                component={CreateBudgetNavigation}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Clipboard size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />

            <Tab.Screen
                name="profileTab"
                component={ProfileNavigation}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <User size={size} color={color} weight={focused ? "fill" : "regular"} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}