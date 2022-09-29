import { Api } from "../../../lib/Api";
import { User, UserAddress } from "../../../types/user";

export async function searchAddress(user: User): Promise<UserAddress[]> {
    try {
        const url = user.type === "Consumidor" ? "address/find-by-consumer-id" : "address/find-by-provider-id";

        const response = await Api.get(url, {
            params: {
                consumerId: user.type === "Consumidor" ? user.id : null,
                providerId: user.type === "Fornecedor" ? user.id : null
            }
        });

        return response.data.map(adress => ({
            id: adress.id,
            state: adress.state,
            city: adress.city,
            district: adress.district,
            street: adress.street,
            numberStreet: adress.numberStreet,
            postCode: adress.postCode,
            complement: adress.complement,
            isMainAddress: adress.main
        }));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}