import * as AuthSession from 'expo-auth-session';

import { AuthResponse } from "../../../types/authentication";

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