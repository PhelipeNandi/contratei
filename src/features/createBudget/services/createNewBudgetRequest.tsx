import { Api } from '../../../lib/Api';

import { CreateNewBudget } from '../../../types/budget';
import { User } from '../../../types/user';

export async function createNewBudgetRequest(data: CreateNewBudget, user: User): Promise<string> {
    try {
        const response = await Api.post("budget", {
            title: data.title,
            status: "OPEN",
            priority: data.priorityLevel,
            serviceType: data.serviceType,
            description: data.description,
            openingDate: new Date(),
            consumer: {
                id: user.id
            }
        });

        if (response.status === 200) {
            return "Seu orçamento foi cadastro com sucesso"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}