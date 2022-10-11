import { Api } from "../../../lib/Api";
import { Budget } from "../../../types/budget";

export async function getBudgetById(idBudget: number): Promise<Budget> {
    try {
        const response = await Api.get("/budget", { params: { id: idBudget } });

        return {
            id: response.data.id,
            title: response.data.title,
            status: response.data.status,
            value: response.data.value,
            priorityLevel: response.data.priority,
            serviceType: response.data.serviceType,
            description: response.data.description,
            openingDate: response.data.openingDate,
            completionDate: response.data.completionDate,
            consumerId: response.data.consumer.id,
            provider: response.data.provider ? {
                id: response.data.provider.id,
                firstName: response.data.provider.firstName,
                lastName: response.data.provider.lastName,
                profilePicture: response.data.provider.profilePicture,
                contactNumber: response.data.provider.contactNumber
            } : null
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}