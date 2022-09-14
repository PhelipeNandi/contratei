export const normalizeStatus = (value: string | undefined) => {
    if (!value) return '';

    switch (value) {
        case "OPEN":
            return "Aberto";
        case "IN_PROGRESS":
            return "Em andamento";
        case "CLOSED":
            return "Finalizado";
        case "CANCELED":
            return "Cancelado";
    }
}

export const normalizeServiceType = (value: string | undefined) => {
    if (!value) return '';

    return value[0].toUpperCase() + value.slice(1).toLowerCase();
}

export const normalizeBudgetValue = (value: string | undefined) => {
    if (!value) return '';

    return "R$ " + Number(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}