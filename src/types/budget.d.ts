export interface Budget {
    id?: string;
    title: string;
    status: 'open' | 'finish' | 'inProgress' | 'canceled';
    value?: string;
    priorityLevel: string;
    serviceType: string;
    description: string;
    openingDate: string;
    completionDate?: string;
}

export interface CreateNewBudget {
    title: string;
    priorityLevel: string;
    serviceType: string;
    description: string;
}