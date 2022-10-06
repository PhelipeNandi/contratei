import { Api } from "../../../lib/Api";
import { SignInData } from "../../../types/authentication";
import { User, UserResponse } from "../../../types/user";

async function handleSignIn(data: SignInData): Promise<string> {
    try {
        const responseAuthenticate = await Api.post("login/authenticate", {
            email: data.email,
            password: data.password
        });

        Api.defaults.headers['Authorization'] = `Bearer ${responseAuthenticate.data.jwt}`;

        return responseAuthenticate.data.jwt;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

async function handleFindUser(email: string): Promise<UserResponse> {
    try {
        const reponseFindUser = await Api.get("login/find-user", {
            params: { email: email }
        });

        return reponseFindUser.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function signInRequest(data: SignInData): Promise<User> {
    try {
        const token = await handleSignIn(data);
        const user = await handleFindUser(data.email);

        return {
            id: user.id,
            password: user.password,
            type: user.isProvider ? "Fornecedor" : "Consumidor",
            firstName: user.firstName,
            lastName: user.lastName,
            contactNumber: user.contactNumber,
            cpf: user.cpf,
            email: user.email,
            token: token,
            description: user.description,
            hourValue: user.hourValue,
            actingRegion: user.actingRegion,
            profilePicture: user.profilePicture,
            backgroundImage: user.backgroundImage
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}