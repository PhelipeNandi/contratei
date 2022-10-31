import { Api } from '../../../lib/Api';

import { BudgetResponse } from '../../../types/budget';

export async function searchMyBudgets(pageParam: number, userId: number, status: string, isConsumer: boolean): Promise<BudgetResponse> {
    try {
        const url = isConsumer ? "budget/find-by-consumer" : "budget/find-by-provider";

        const response = await Api.get(url, {
            params: {
                page: pageParam,
                size: 5,
                consumerId: isConsumer ? userId : null,
                providerId: !isConsumer ? userId : null,
                status: status === "ALL" ? null : status
            }
        });

        return {
            budgets: response.data.content.map(budget => ({
                id: budget.id,
                title: budget.title,
                status: budget.status,
                value: budget.value,
                priorityLevel: budget.priority,
                serviceType: budget.serviceType,
                description: budget.description,
                openingDate: budget.openingDate,
                completionDate: budget.completionDate,
                consumer: {
                    id: budget.consumer.id
                },
                provider: response.data.provider ? {
                    id: response.data.provider.id
                } : null
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