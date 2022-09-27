import { Api } from "../../../lib/Api";
import { ChangePersonalInformation, User } from "../../../types/user";

export async function changePersonalInformation(data: ChangePersonalInformation, user: User): Promise<string> {
    try {
        const changePersonalInformationUrl = user.type === "Consumidor" ? "login/create-consumer-user" : "login/create-provider-user";

        const response = await Api.post(changePersonalInformationUrl, {
            id: user.id,
            password: user.password,
            type: user.type,
            firstName: data.firstName,
            lastName: data.lastName,
            contactNumber: data.contactNumber,
            cpf: data.cpf,
            email: data.email,
            description: data.description,
            kmWorkRange: data.kmWorkRange,
            hourValue: data.hourValue,
            profilePicture: data.profilePicture
        });

        if (response.status === 200) {
            return "Cadastro atualizado com sucesso!"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}