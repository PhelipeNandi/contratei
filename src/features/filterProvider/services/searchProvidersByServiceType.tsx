import { Api } from "../../../lib/Api";
import { ProviderResponse } from "../../../types/provider";

export async function searchProvidersByServiceType(pageParam: number, serviceType: string): Promise<ProviderResponse> {
    try {
        const { data } = await Api.get("provider", {
            params: {
                page: pageParam,
                size: 5,
                serviceType: serviceType
            }
        });

        return {
            providers: data.content.map(provider => ({
                id: provider.id,
                serviceType: serviceType,
                firstName: provider.firstName,
                lastName: provider.lastName,
                contactNumber: provider.contactNumber,
                cpf: provider.cpf,
                email: provider.email,
                description: provider.description,
                kmWorkRange: provider.kmWorkRange,
                hourValue: provider.hourValue
            })),
            currentPage: data.number,
            totalPages: data.totalPages
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        };
    }
}