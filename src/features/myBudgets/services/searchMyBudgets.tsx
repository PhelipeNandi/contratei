import { Api } from '../../../lib/Api';

import { BudgetResponse } from '../../../types/budget';

export async function searchMyBudgets(pageParam: number, userId: number, status: string): Promise<BudgetResponse> {
    try {
        const { data } = await Api.get("budget/find-by-consumer", {
            params: {
                page: pageParam,
                size: 5,
                consumerId: userId,
                status: status === "ALL" || status === null ? null : status
            }
        });

        return {
            budgets: data.content.map(budget => ({
                id: budget.id,
                title: budget.title,
                status: budget.status,
                value: budget.value,
                priorityLevel: budget.priority,
                serviceType: budget.serviceType,
                description: budget.description,
                openingDate: budget.openingDate,
                completionDate: budget.completionDate,
                consumerId: budget.consumer.id,
                providerId: budget.provider === null ? null : budget.provider.id
            })),
            currentPage: data.number,
            totalPages: data.totalPages
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        };
    }
}