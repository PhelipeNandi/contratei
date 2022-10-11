import { Api } from "../../../lib/Api";
import { Photo } from "../../../types/provider";

export async function searchPhotosProvider(providerId: number, isAuthenticated?: boolean): Promise<Photo[]> {
    try {
        const url = isAuthenticated ? "/provider/find-photos-provider" : "/login/find-photos-provider";

        const response = await Api.get(url, {
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