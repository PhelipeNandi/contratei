import { Api } from "../../../lib/Api";
import { RegisterNewUser } from "../../../types/user";

export async function registerAccountRequest(data: RegisterNewUser) {
    const registerAccountUrl = data.type === "Consumidor" ? "login/create-consumer-user" : "login/create-provider-user";

    const response = await Api.post(registerAccountUrl, {
        firstName: data.firstName,
        lastName: data.lastName,
        contactNumber: data.contactNumber,
        cpf: data.cpf,
        email: data.email,
        password: data.password
    });

    return response;
}