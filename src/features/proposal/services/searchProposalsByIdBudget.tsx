import { Api } from "../../../lib/Api";
import { Proposal } from "../../../types/budget";

export async function searchProposalsByIdBudget(idBudget: number): Promise<Proposal[]> {
    try {
        const response = await Api.get("/proposal/find-by-budget", {
            params: {
                budgetId: idBudget
            }
        });

        return response.data.map(proposal => ({
            id: proposal.id,
            idBudget: proposal.budget.id,
            provider: {
                id: proposal.provider.id,
                firstName: proposal.provider.firstName,
                lastName: proposal.provider.lastName,
                profilePicture: proposal.provider.profilePicture,
                contactNumber: proposal.provider.contactNumber
            },
            description: proposal.description,
            averageValue: proposal.averageValue,
            accepted: proposal.accepted ? false : proposal.accepted
        }));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}