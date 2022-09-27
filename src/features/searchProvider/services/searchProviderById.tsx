import { Api } from "../../../lib/Api";
import { Provider } from "../../../types/provider";

export async function searchProviderById(idProvider: number): Promise<Provider> {
    try {
        const response = await Api.get("provider/find-by-id", { params: { id: idProvider } });

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