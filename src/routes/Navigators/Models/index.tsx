import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ServiceType } from "../../../types/provider";

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
    adresses: undefined,
    addNewAdress: undefined,
    adressNavigation: undefined,
    notifications: undefined,
    settings: undefined,
    budget: {
        idBudget: number
    },
    filterProvider: {
        serviceType: ServiceType
    },
    provider: undefined,
    commentsProvider: undefined,
    createNewCommentProvider: undefined
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