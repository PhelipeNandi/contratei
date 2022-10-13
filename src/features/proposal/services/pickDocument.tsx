import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { DocumentProposal } from '../../../types/budget';

export async function pickDocument(): Promise<DocumentProposal> {
    try {
        const document = await DocumentPicker.getDocumentAsync();

        //@ts-ignore
        const base64 = await FileSystem.readAsStringAsync(document.uri, { encoding: 'base64' });

        return {
            url: base64,
            //@ts-ignore
            name: document.name
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}