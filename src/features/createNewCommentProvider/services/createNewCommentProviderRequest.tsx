import { Api } from "../../../lib/Api";
import { NewCommentProvider } from "../../../types/provider";

export async function createNewCommentProviderRequest(data: NewCommentProvider, idConsumer: number, idProvider: number) {
    try {
        console.log("Data: ", data);
        console.log("Provider: ", idProvider);
        console.log("Consumer: ", idConsumer);

        const response = await Api.post("consumer/create-comment", {
            provider: {
                id: idProvider,
                pictures: [],
                comments: []
            },
            consumer: {
                id: idConsumer
            },
            score: data.rating,
            comment: data.description
        });

        if (response.status === 200) {
            return "Seu comentário foi cadastro com sucesso";
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}