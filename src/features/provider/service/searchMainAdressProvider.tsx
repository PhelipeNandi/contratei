import { Api } from "../../../lib/Api";
import { ProviderMainAddress } from "../../../types/provider";

export async function searchMainAdressProvider(providerId: number, isAuthenticated: boolean): Promise<ProviderMainAddress> {
    try {
        const url = isAuthenticated ? "/provider/find-main-address" : "/login/find-provider-main-address";

        const response = await Api.get(url, {
            params: {
                providerId: providerId
            }
        });

        return {
            state: response.data.state,
            city: response.data.city,
            district: response.data.district,
            street: response.data.street,
            postCode: response.data.postCode,
            numberStreet: response.data.numberStreet
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}