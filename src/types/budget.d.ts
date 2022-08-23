export interface Budget {
    id?: string;
    title: string;
    status: 'open' | 'closed';
    value?: string;
    priorityLevel: string;
    type: string;
    description: string;
    openingDate: string;
    completionDate?: string;
}

export interface CreateNewBudget {
    title: string;
    priorityLevel: string;
    type: string;
    description: string;
}