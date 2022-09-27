export interface RegisterNewUser {
    type: 'Consumidor' | 'Fornecedor';
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
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