import { Api } from "../../../lib/Api";

export async function removeCreditCard(idCreditCard: number): Promise<string> {
    try {
        const response = await Api.delete("credit-card/" + idCreditCard);

        if (response.status === 200) {
            return "Cartão de crédito removido com sucesso!"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}