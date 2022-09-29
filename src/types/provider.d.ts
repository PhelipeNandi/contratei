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
    rating: string;
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

export interface NewCommentProvider {
    rating: string;
    description: string;
}

export interface Comment {
    idComent: number;
    idConsumer: number;
    name: string;
    photo: string;
    rating: string;
    description: string;
}

export interface CommentResponse {
    comments: Comment[],
    currentPage: number;
    totalPages: number;
}