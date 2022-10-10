import { Photo } from "./provider";

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
    hourValue?: string;
    actingRegion?: string;
    profilePicture?: string;
    backgroundImage?: string;
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
    hourValue: string;
    actingRegion: string;
    profilePicture: string;
    backgroundImage: string;
}

export interface ChangePersonalInformation {
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    email: string;
    description?: string;
    hourValue?: string;
    actingRegion?: string;
    profilePicture?: string;
    backgroundImage?: string;
    photosProvider?: Photo[];
}

export interface UserAddress {
    id: number;
    state: string;
    city: string;
    district: string;
    street: string;
    numberStreet: string;
    postCode: string;
    complement: string;
    isMainAddress: string;
}

export interface UserAddressResponse {
    state: string;
    city: string;
    district: string;
    street: string;
    postCode: string;
}

export interface NewAddress {
    id?: number;
    state: string;
    city: string;
    district: string;
    street: string;
    numberStreet: string;
    postCode: string;
    complement: string;
    isMainAddress: string;
}