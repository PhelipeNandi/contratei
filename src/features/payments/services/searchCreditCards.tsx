import { Api } from "../../../lib/Api";
import { CreditCard } from "../../../types/user";

export async function searchCreditCards(consumerId: number): Promise<CreditCard[]> {
    try {
        const response = await Api.get("credit-card/find-by-consumer-id", {
            params: {
                consumerId: consumerId
            }
        });

        return response.data.map(creditCard => ({
            id: creditCard.id,
            number: creditCard.number,
            holder: creditCard.holder,
            validity: creditCard.validity,
            cvv: creditCard.cvv
        }));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}