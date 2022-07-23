import axios from "axios";

type signInRequestData = {
    email: string;
    password: string;
}

export interface User {
    token: string;
}

export const Api = axios.create({
    baseURL: "http://192.168.16.127:8080/api/"
});

export async function signInRequest(data: signInRequestData) {
    const response = await Api.post("login/authenticate", {
        email: data.email,
        password: data.password
    });

    return response.data as User;
}