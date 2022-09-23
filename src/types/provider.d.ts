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