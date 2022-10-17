import { Api } from "../../../lib/Api";
import { NewProposalBudget } from "../../../types/budget";

export async function createProposal(data: NewProposalBudget, providerId: number, budgetId: number): Promise<string> {
    try {
        const response = await Api.post("proposal", {
            provider: {
                id: providerId
            },
            budget: {
                id: budgetId
            },
            description: data.description,
            averageValue: data.averageValue
        });

        if (response.status === 200) {
            return "Propostal criada com sucesso!"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}