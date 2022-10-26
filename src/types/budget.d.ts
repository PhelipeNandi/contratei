import { ConsumerBudget, ProviderBudget, ProviderProposal } from "./provider";

export interface Budget {
    id: number;
    title: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'CANCELED';
    value?: string;
    priorityLevel: 'TODAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'COMBINE';
    serviceType: 'EMPREGADO' | 'MARCENEIRO' | 'PINTOR' | 'PEDREIRO' | 'MECANICO';
    description: string;
    openingDate: date;
    completionDate?: date;
    consumer: ConsumerBudget;
    provider?: ProviderBudget;
}

export interface CreateNewBudget {
    title: string;
    priorityLevel: string;
    serviceType: string;
    description: string;
}

export interface BudgetResponse {
    budgets: Budget[];
    currentPage: number;
    totalPages: number;
}

export interface Proposal {
    id: number;
    idBudget: number;
    provider: ProviderProposal;
    description: string;
    averageValue: string;
    accepted: boolean;
}

export interface NewProposalBudget {
    description: string;
    averageValue: string;
}