import { Api } from "../../../lib/Api";
import { User } from "../../../types/user";
import { Provider } from "../../../types/provider";

export async function searchBetterProviders(user: User, isAuthenticated: boolean): Promise<Provider[]> {
    try {
        const url = isAuthenticated ? "/provider/better-providers" : "/login/better-providers";

        const response = await Api.get(url, {
            params: {
                consumerId: isAuthenticated ? user.id : null
            }
        });

        return response.data.map(provider => ({
            id: provider.id,
            serviceType: provider.serviceType,
            firstName: provider.firstName,
            lastName: provider.lastName,
            contactNumber: provider.contactNumber,
            cpf: provider.cpf,
            email: provider.email,
            description: provider.description,
            hourValue: provider.hourValue,
            actingRegion: provider.actingRegion,
            rating: provider.score,
            profilePicture: provider.profilePicture,
            backgroundImage: provider.backgroundImage
        }));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}