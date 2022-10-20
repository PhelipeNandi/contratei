import { Api } from "../../../lib/Api";
import { Proposal } from "../../../types/budget";

export async function searchProposalByIdProvider(providerId: number, budgetId: number): Promise<Proposal> {
    try {
        const response = await Api.get("/proposal/find-existing-proposal", {
            params: {
                providerId: providerId,
                budgetId: budgetId
            }
        });

        if (response.data != "") {
            return {
                id: response.data.id,
                idBudget: response.data.budget.id,
                provider: {
                    id: response.data.provider.id,
                    firstName: response.data.provider.firstName,
                    lastName: response.data.provider.lastName,
                    profilePicture: response.data.provider.profilePicture,
                    contactNumber: response.data.provider.contactNumber
                },
                description: response.data.description,
                averageValue: response.data.averageValue,
                accepted: !response.data.accepted ? false : response.data.accepted
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}