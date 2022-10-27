import { Api } from '../../../lib/Api';

import { User } from '../../../types/user';
import { Provider } from '../../../types/provider';

export async function createEmptyBudget(user: User, provider: Provider): Promise<string> {
    try {
        const nameProvider = provider.firstName + " " + provider.lastName;

        const response = await Api.post("budget", {
            title: "Orçamento Manual",
            status: "IN_PROGRESS",
            priority: "COMBINE",
            serviceType: provider.serviceType,
            description: "Realizado contratação dos serviços do fornecedor " + nameProvider + " manualmente.",
            openingDate: new Date(),
            consumer: {
                id: user.id
            },
            provider: {
                id: provider.id
            }
        });

        if (response.status === 200) {
            return "Orçamento manual criado com sucesso!"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}