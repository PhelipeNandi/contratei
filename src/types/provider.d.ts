export interface Provider {
    id: number;
    serviceType: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    cpf: string;
    email: string;
    description: string;
    hourValue: string;
    actingRegion: string;
    rating: string;
    profilePicture: string;
    backgroundImage: string;
}

export interface ConsumerBudget {
    id: number;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    contactNumber?: string;
}

export interface ProviderBudget {
    id: number;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    contactNumber?: string;
}

export interface ProviderProposal {
    id: number;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    contactNumber?: string;
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
    id?: number;
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

export interface ProviderMainAddress {
    state: string;
    city: string;
    district: string;
    street: string;
    postCode: string;
    numberStreet: string;
}