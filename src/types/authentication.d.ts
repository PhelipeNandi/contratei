export interface RegisterNewUser {
    type: 'Consumidor' | 'Fornecedor';
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    serviceType?: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface AuthResponse {
    type: string,
    params: {
        access_token: string
    }
}

export interface GoogleUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}