import { Api } from '../../../lib/Api';

import { CreateNewBudget } from '../../../types/budget';
import { User } from '../../../types/user';

export async function createNewBudgetRequest(data: CreateNewBudget, user: User) {
    const response = await Api.post("buget", {
        title: data.title,
        status: "ABERTO",
        priority: data.priorityLevel,
        serviceType: data.serviceType,
        description: data.description,
        openingDate: new Date(),
        consumer: {
            id: user.id
        }
    }).then(result => {
        return Promise.resolve("Seu orçamento foi cadastrado com suceso!");
    }).catch(error => {
        console.log(error);
        return Promise.reject("Ocorreu um erro ao criar o orçamento, fale com um suporte :(");
    });

    return response;
}