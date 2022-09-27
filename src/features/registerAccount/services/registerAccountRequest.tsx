import { Api } from "../../../lib/Api";
import { RegisterNewUser } from "../../../types/authentication";

export async function registerAccountRequest(data: RegisterNewUser): Promise<string> {
    try {
        const registerAccountUrl = data.type === "Consumidor" ? "login/create-consumer-user" : "login/create-provider-user";

        const response = await Api.post(registerAccountUrl, {
            firstName: data.firstName,
            lastName: data.lastName,
            contactNumber: data.contactNumber,
            cpf: data.cpf,
            email: data.email,
            password: data.password
        });

        if (response.status === 200) {
            return "Parabéns!! Seu cadastrado foi concluído com sucesso :D"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}