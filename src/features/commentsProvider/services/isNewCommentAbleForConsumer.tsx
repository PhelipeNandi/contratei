import { Api } from "../../../lib/Api";

export async function isNewCommentAbleForConsumer(consumerId: number, providerId: number): Promise<boolean> {
    try {
        const response = await Api.get("budget/exist-budget", {
            params: {
                consumerId: consumerId,
                providerId: providerId
            }
        });

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        };
    }
}