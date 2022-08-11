import * as AuthSession from 'expo-auth-session';

import { Api } from "./Api";
import { SignInData, User, RegisterNewUser, AuthResponse } from "../types/user";

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

export async function signInGoogleRequest() {
    const CLIENT_ID = '1046192833257-u78sr0ut46n0bog32lqum1tuoe0jo4po.apps.googleusercontent.com';
    const REDIRECT_UI = 'https://auth.expo.io/@phelipenandi/contratei';
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_UI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

    if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`);
        const user = await response.json();

        console.log(user);
    }
}

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