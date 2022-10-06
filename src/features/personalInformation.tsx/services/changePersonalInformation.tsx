import { Api } from "../../../lib/Api";
import { ChangePersonalInformation, User } from "../../../types/user";

export async function changePersonalInformation(data: ChangePersonalInformation, user: User): Promise<User> {
    try {
        if (user.type === "Consumidor") {
            return handleChangePersonalInformationConsumer(data, user);
        } else {
            return handleChangePersonalInformationProvider(data, user);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
async function handleChangePersonalInformationConsumer(data: ChangePersonalInformation, user: User): Promise<User> {
    try {
        const response = await Api.put("consumer/" + user.id, {
            firstName: data.firstName,
            lastName: data.lastName,
            contactNumber: data.contactNumber,
            cpf: data.cpf,
            email: data.email,
            profilePicture: data.profilePicture
        });

        return {
            id: response.data.id,
            password: response.data.password,
            type: "Consumidor",
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            contactNumber: response.data.contactNumber,
            cpf: response.data.cpf,
            email: response.data.email,
            token: user.token,
            profilePicture: response.data.profilePicture
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

async function handleChangePersonalInformationProvider(data: ChangePersonalInformation, user: User): Promise<User> {
    try {
        const response = await Api.put("provider/" + user.id, {
            firstName: data.firstName,
            lastName: data.lastName,
            contactNumber: data.contactNumber,
            cpf: data.cpf,
            email: data.email,
            profilePicture: data.profilePicture,
            description: data.description,
            hourValue: data.hourValue,
            actingRegion: data.actingRegion,
            backgroundImage: data.backgroundImage
        });

        return {
            id: response.data.id,
            password: response.data.password,
            type: "Fornecedor",
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            contactNumber: response.data.contactNumber,
            cpf: response.data.cpf,
            email: response.data.email,
            token: user.token,
            description: response.data.description,
            hourValue: response.data.hourValue,
            actingRegion: response.data.actingRegion,
            profilePicture: response.data.profilePicture,
            backgroundImage: response.data.backgroundImage
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}