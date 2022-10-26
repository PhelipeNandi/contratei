import { Api } from "../../../lib/Api";
import { Budget } from "../../../types/budget";

export async function changeBudget(data: Budget, status: string, value?: string): Promise<string> {
    try {
        const response = await Api.put("/budget/" + data.id, {
            id: data.id,
            title: data.title,
            status: status,
            value: value ? value : data.value,
            priority: data.priorityLevel,
            serviceType: data.serviceType,
            description: data.description,
            openingDate: data.openingDate,
            completionDate: data.completionDate,
            consumer: {
                id: data.consumer.id
            },
            provider: {
                id: data.provider.id
            }
        })

        if (response.status === 200) {
            return "O orçamento foi alterado com sucesso!"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}