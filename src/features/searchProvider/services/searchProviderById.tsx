import { Api } from "../../../lib/Api";
import { Provider } from "../../../types/provider";

export async function searchProviderById(idProvider: number, isAuthenticated: boolean): Promise<Provider> {
    try {
        const url = isAuthenticated ? "provider/find-by-id" : "provider/find-by-id";

        const response = await Api.get(url, { params: { id: idProvider } });

        return {
            id: response.data.id,
            serviceType: response.data.serviceType,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            contactNumber: response.data.contactNumber,
            cpf: response.data.cpf,
            email: response.data.email,
            description: response.data.description,
            kmWorkRange: response.data.kmWorkRange,
            hourValue: response.data.hourValue
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}