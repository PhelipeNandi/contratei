import { Api } from '../../../lib/Api';

import { BudgetResponse } from '../../../types/budget';

export async function searchBudgets(pageParam: number, userId: number, priorityLevel: string): Promise<BudgetResponse> {
    try {
        const response = await Api.get("budget/find-open-budgets", {
            params: {
                page: pageParam,
                size: 5,
                providerId: userId,
                priorityLevel: priorityLevel === "ALL" || priorityLevel === null ? null : priorityLevel
            }
        });

        return {
            budgets: response.data.content.map(budget => ({
                id: budget.id,
                title: budget.title,
                status: budget.status,
                priorityLevel: budget.priority,
                serviceType: budget.serviceType,
                description: budget.description,
                openingDate: budget.openingDate,
                consumerId: budget.consumer.id
            })),
            currentPage: response.data.number,
            totalPages: response.data.totalPages
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        };
    }
}