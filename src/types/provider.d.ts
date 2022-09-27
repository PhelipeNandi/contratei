export interface Provider {
    id: number;
    serviceType: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    email: string;
    description: string;
    kmWorkRange: string;
    hourValue: string;
}

export interface ServiceType {
    id: number;
    name: string;
}

export interface ProviderResponse {
    providers: Provider[];
    currentPage: number;
    totalPages: number;
}

export interface Photo {
    id: number;
    url: string;
}

export interface Comment {
    idComent: number;
    idConsumer: number;
    name: string;
    photo: Photo;
    rating: number;
    description: string;
}