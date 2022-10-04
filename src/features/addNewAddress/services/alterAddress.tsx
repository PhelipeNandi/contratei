import { Api } from "../../../lib/Api";
import { NewAddress } from "../../../types/user";

export async function alterAddress(data: NewAddress) {
    try {
        const response = await Api.put("address/change-address/" + data.id, {
            id: data.id,
            state: data.state,
            city: data.city,
            district: data.district,
            street: data.street,
            numberStreet: data.numberStreet,
            postCode: data.postCode,
            complement: data.complement,
            main: data.isMainAddress
        });

        if (response.status === 200) {
            return "O endereço foi alterado com sucesso!"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}