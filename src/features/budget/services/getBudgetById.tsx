import { Api } from "../../../lib/Api";
import { Budget } from "../../../types/budget";

export async function getBudgetById(idBudget: number): Promise<Budget> {
    try {
        const response = await Api.get("", { params: { id: idBudget } });

        return {
            id: response.data.id,
            title: response.data.title,
            status: response.data.status,
            value: response.data.value,
            priorityLevel: response.data.priority,
            serviceType: response.data.serviceType,
            description: response.data.description,
            openingDate: response.data.openingDate,
            completionDate: response.data.openingDate,
            consumerId: response.data.consumer.id,
            providerId: response.data.provider ? response.data.provider.id : null
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}