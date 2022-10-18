import { Api } from "../../../lib/Api";
import { User } from "../../../types/user";
import { ProviderResponse } from "../../../types/provider";

export async function searchProvidersByServiceType(pageParam: number, serviceType: string, isAuthenticated: boolean, user?: User): Promise<ProviderResponse> {
    try {
        const url = isAuthenticated ? "provider" : "login/find-provider";

        const { data } = await Api.get(url, {
            params: {
                page: pageParam,
                size: 5,
                serviceType: serviceType,
                consumerId: isAuthenticated ? user.id : null
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
                hourValue: provider.hourValue,
                actingRegion: provider.actingRegion,
                rating: provider.score
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