import { Api } from '../../../lib/Api';

import { Budget } from '../../../types/budget';

export async function searchMyBudgets(page: string, size: string, consumerID: number): Promise<Budget[]> {
    try {
        const { data } = await Api.get("budget/find-by-consumer", {
            params: {
                page: page,
                size: size,
                consumerId: consumerID
            }
        });

        return data.content.map(budget => ({
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
            providerId: budget.provider.id
        }));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        };
    }
}