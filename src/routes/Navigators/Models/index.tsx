import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ServiceType } from "../../../types/user";

export type propsNavigationStack = {
    splashScreen: undefined,
    signIn: undefined,
    registerAccount: undefined,
    dashboard: undefined,
    searchProvider: undefined,
    myBudgets: undefined,
    createBudget: undefined,
    profile: undefined,
    personalInformation: undefined,
    payments: undefined,
    addNewCreditCard: undefined,
    notifications: undefined,
    settings: undefined,
    budget: {
        idBudget: number
    },
    filterProvider: {
        serviceType: ServiceType
    },
    provider: {
        idProvider: number
    }
}

export type propsNavigationTab = {
    dashboardTab: undefined,
    myBudgetsTab: undefined,
    searchProviderTab: undefined,
    createBudgetTab: undefined,
    profileTab: undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
export type propsTab = BottomTabNavigationProp<propsNavigationTab>;