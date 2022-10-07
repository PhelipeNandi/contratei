import * as ImagePicker from 'expo-image-picker';

export async function pickImage(): Promise<string> {
    try {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!image.cancelled) {
            //@ts-ignore
            return image.base64;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}