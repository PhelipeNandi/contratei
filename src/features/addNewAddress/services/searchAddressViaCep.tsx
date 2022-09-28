import { ViaCep } from "../../../lib/Api";
import { UserAddressResponse } from "../../../types/user";

export async function searchAddressViaCep(cep: string): Promise<UserAddressResponse> {
    try {
        const response = await ViaCep.get(cep + "/json");

        return {
            state: response.data.uf,
            city: response.data.localidade,
            district: response.data.bairro,
            street: response.data.logradouro,
            postCode: response.data.cep
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}