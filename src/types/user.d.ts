export interface User {
    id: number;
    password: string;
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
    profilePicture?: string;
}

export interface ChangePersonalInformation {
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    email: string;
    description?: string;
    kmWorkRange?: string;
    hourValue?: string;
    profilePicture?: string;
}

export interface UserResponse {
    id: number;
    password: string;
    isProvider: boolean;
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    email: string;
    description: string;
    kmWorkRange: string;
    hourValue: string;
    profilePicture: string;
}