import { Api } from "../../../lib/Api";
import { SignInData, User } from "../../../types/user";

export async function signInRequest(data: SignInData) {
    const responseAuthenticate = await Api.post("login/authenticate", {
        email: data.email,
        password: data.password
    });

    Api.defaults.headers['Authorization'] = `Bearer ${responseAuthenticate.data.jwt}`;

    const reponseFindUser = await Api.get("login/find-user", {
        params: { email: data.email }
    });

    return {
        id: reponseFindUser.data.id,
        type: reponseFindUser.data.isProvider ? "Fornecedor" : "Consumidor",
        firstName: reponseFindUser.data.firstName,
        lastName: reponseFindUser.data.lastName,
        contactNumber: reponseFindUser.data.contactNumber,
        cpf: reponseFindUser.data.cpf,
        email: reponseFindUser.data.email,
        token: responseAuthenticate.data.jwt,
        description: reponseFindUser.data.isProvider ? reponseFindUser.data.description : null,
        kmWorkRange: reponseFindUser.data.isProvider ? reponseFindUser.data.kmWorkRange : null,
        hourValue: reponseFindUser.data.isProvider ? reponseFindUser.data.hourValue : null
    } as User;
}