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

export const normalizePriorityLevel = (value: string | undefined) => {
    if (!value) return '';

    switch (value) {
        case "TODAY":
            return "Hoje";
        case "THIS_WEEK":
            return "Essa semana";
        case "THIS_MONTH":
            return "Esse mês";
        case "COMBINE":
            return "A combinar";
    }
}

export const normalizeServiceType = (value: string | undefined) => {
    if (!value) return '';

    return value[0].toUpperCase() + value.slice(1).toLowerCase();
}

export const normalizeContactNumberValeu = (value: string | undefined) => {
    if (!value) return '';

    return value.replace(/[\D]/g, '');
}

export const normalizeBudgetValue = (value: string | undefined) => {
    if (!value) return '';

    return "R$ " + Number(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

export const normalizeRatingProvider = (value: string | undefined): number => {
    if (!value) return 0;

    return Number((Number(value) * 2).toFixed(2));
}

export const normalizeNumberCreditCard = (value: string | undefined) => {
    if (!value) return "";

    return value.replace(/[\D]/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2');
}

export const normalizeValidityCreditCard = (value: string | undefined) => {
    if (!value) return "";

    return value.replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '$1/01/$2');
}