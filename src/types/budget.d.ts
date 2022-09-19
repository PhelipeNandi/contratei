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
    consumerId: number;
    providerId?: number;
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