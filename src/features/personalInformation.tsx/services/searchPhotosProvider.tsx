import { Api } from "../../../lib/Api";
import { Photo } from "../../../types/provider";

export async function searchPhotosProvider(providerId: number): Promise<Photo[]> {
    try {
        const response = await Api.get("/provider/find-photos-provider", {
            params: {
                providerId: providerId
            }
        });

        return response.data.map(photo => ({
            id: photo.id,
            url: photo.picture
        }))
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}