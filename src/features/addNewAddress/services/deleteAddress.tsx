import { Api } from "../../../lib/Api";

export async function deleteAddress(idAddress: number): Promise<string> {
    try {
        const response = await Api.delete("address/" + idAddress);

        if (response.status === 200) {
            return "O endereço foi deletado com sucesso!"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}