import { Api } from "../../../lib/Api";
import { CommentResponse } from "../../../types/provider";

export async function searchCommentsByIdProvider(pageParam: number, size: number, providerId: number, isAuthenticated: boolean): Promise<CommentResponse> {
    try {
        const url = isAuthenticated ? "provider/find-comment-by-provider" : "login/find-comment-by-provider";

        const response = await Api.get(url, {
            params: {
                page: pageParam,
                size: size,
                providerId: providerId
            }
        });

        return {
            comments: response.data.content.map(commment => ({
                idComent: commment.id,
                idConsumer: commment.consumer.id,
                name: commment.consumer.firstName + " " + commment.consumer.lastName,
                photo: commment.consumer.profilePicture,
                rating: commment.score,
                description: commment.comment
            })),
            currentPage: response.data.number,
            totalPages: response.data.totalPages
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        };
    }
}