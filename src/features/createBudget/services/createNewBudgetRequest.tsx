import { Api } from '../../../lib/Api';

import { CreateNewBudget } from '../../../types/budget';

export async function createNewBudgetRequest(data: CreateNewBudget) {
    const response = await Api.post("buget", {
        title: data.title,
        status: "ABERTO",
        priority: data.priorityLevel,
        serviceType: data.serviceType,
        description: data.description,
        openingDate: new Date()
    }).then(result => {
        return Promise.resolve("Seu orçamento foi cadastrado com suceso!");
    }).catch(error => {
        return Promise.reject("Ocorreu um erro ao criar o orçamento, fale com um suporte :(");
    });

    return response;
}