import { Api } from "../../../lib/Api";

export async function acceptProposal(idProposal: number, idBudget: number): Promise<string> {
    try {
        const response = await Api.post("/proposal/accept-proposal", null, {
            params: {
                proposalId: idProposal,
                budgetId: idBudget
            }
        });

        if (response.status === 200) {
            return "Proposta aceita com sucesso!";
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}