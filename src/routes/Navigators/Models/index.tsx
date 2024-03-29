import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ServiceType } from "../../../types/provider";

export type propsNavigationStack = {
    splashScreen: undefined,
    signIn: undefined,
    registerAccount: undefined,
    dashboard: undefined,
    searchProvider: undefined,
    searchProviderNavigation: undefined,
    myBudgets: undefined,
    createBudget: undefined,
    searchBudgets: undefined,
    profile: undefined,
    personalInformation: undefined,
    payments: undefined,
    addNewCreditCard: undefined,
    creditCardNavigation: undefined,
    addresses: undefined,
    addNewAddress: undefined,
    addressNavigation: undefined,
    notifications: undefined,
    settings: undefined,
    budget: {
        idBudget: number
    },
    budgetNavigation: undefined,
    proposal: {
        idBudget: number,
        idProposal?: number
    },
    filterProvider: {
        serviceType: ServiceType
    },
    provider: {
        isHirable: boolean
    },
    commentsProvider: undefined,
    createNewCommentProvider: undefined
}

export type propsNavigationTab = {
    dashboardTab: undefined,
    myBudgetsTab: undefined,
    searchProviderTab: undefined,
    createBudgetTab: undefined,
    searchBudgetsTab: undefined,
    profileTab: undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
export type propsTab = BottomTabNavigationProp<propsNavigationTab>;