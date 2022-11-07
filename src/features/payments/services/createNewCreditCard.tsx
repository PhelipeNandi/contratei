import { Api } from "../../../lib/Api";
import { NewCreditCard } from "../../../types/user";
import { normalizeValidityCreditCard } from "../../../utils/formatStrings";

export async function createNewCreditCard(data: NewCreditCard, consumerId: number): Promise<string> {
    try {
        const response = await Api.post("credit-card", {
            holder: data.holder,
            number: data.number,
            validity: new Date(normalizeValidityCreditCard(data.validity)),
            cvv: data.cvv,
            consumer: {
                id: consumerId
            }
        });

        if (response.status === 200) {
            return "Seu cartão de crédito foi cadastrado com sucesso!";
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}