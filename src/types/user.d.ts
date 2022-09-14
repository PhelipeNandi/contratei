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

export interface User {
    id: number;
    type: 'Consumidor' | 'Fornecedor';
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    email: string;
    token: string;
    description?: string;
    kmWorkRange?: string;
    hourValue?: string;
}

export interface UserResponse {
    id: number;
    isProvider: boolean;
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    email: string;
    description: string;
    kmWorkRange: string;
    hourValue: string;
}