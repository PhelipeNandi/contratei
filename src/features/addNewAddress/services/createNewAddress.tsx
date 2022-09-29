import { Api } from "../../../lib/Api";
import { NewAddress, User } from "../../../types/user";

export async function createNewAdress(data: NewAddress, user: User) {
    try {
        const address = {
            state: data.state,
            city: data.city,
            district: data.district,
            street: data.street,
            numberStreet: data.numberStreet,
            postCode: data.postCode,
            main: data.isMainAddress,
            complement: data.complement,
            consumer: user.type != "Consumidor" ? null : {
                id: user.id
            },
            provider: user.type != "Fornecedor" ? null : {
                id: user.id
            },
        }

        const response = await Api.post("/address/create-address", address);

        if (response.status === 200) {
            return "Cadastro de endereço realizado com sucesso!";
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}