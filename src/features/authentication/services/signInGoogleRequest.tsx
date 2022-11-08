import * as AuthSession from 'expo-auth-session';

import { Api } from '../../../lib/Api';
import { User } from '../../../types/user';
import { AuthResponse, GoogleUser, SignInData } from "../../../types/authentication";

export async function signInGoogleRequest(): Promise<GoogleUser> {
    const CLIENT_ID = '1046192833257-u78sr0ut46n0bog32lqum1tuoe0jo4po.apps.googleusercontent.com';
    const REDIRECT_UI = 'https://auth.expo.io/@phelipenandi/contratei';
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_UI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

    if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`);
        const user = await response.json();

        return {
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            password: user.id
        }
    }
}

export async function authenticateGoogleAccount(data: SignInData): Promise<string> {
    console.log(data);
    const responseAuthenticate = await Api.post("login/authenticate", {
        email: data.email,
        password: data.password
    });

    Api.defaults.headers['Authorization'] = `Bearer ${responseAuthenticate.data.jwt}`;

    return responseAuthenticate.data.jwt;
}

export async function findUserGoogleAccount(email: string, token: string): Promise<User> {
    const reponseFindUser = await Api.get("login/find-user", {
        params: { email: email }
    });

    return {
        id: reponseFindUser.data.id,
        password: reponseFindUser.data.password,
        type: reponseFindUser.data.isProvider ? "Fornecedor" : "Consumidor",
        firstName: reponseFindUser.data.firstName,
        lastName: reponseFindUser.data.lastName,
        contactNumber: reponseFindUser.data.contactNumber,
        cpf: reponseFindUser.data.cpf,
        email: reponseFindUser.data.email,
        token: token,
        description: reponseFindUser.data.description,
        hourValue: reponseFindUser.data.hourValue,
        actingRegion: reponseFindUser.data.actingRegion,
        profilePicture: reponseFindUser.data.profilePicture,
        backgroundImage: reponseFindUser.data.backgroundImage
    }
}
