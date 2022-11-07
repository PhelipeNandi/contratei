export const maskContactNumberValue = (value: string | undefined) => {
    if (!value) return '';

    return value.replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1');
}

export const maskCPF = (value: string | undefined) => {
    if (!value) return '';

    return value.replace(/[\D]/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})(\d+?)/, '$1');
}

export const maskNumberCreditCard = (value: string | undefined) => {
    if (!value) return '';

    const regex = /\d(?!\d{0,2}$|\d{13}$)/gm;
    const subst = `*`;

    return value.replace(regex, subst);
}

export const maskValidityCreditCard = (value: string | undefined) => {
    if (!value) return '';

    return value.replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2');
}

export const maskDateValidityCreditCard = (value: string | undefined) => {
    if (!value) return '';

    const date = new Date(value);

    return (date.getMonth() + 1) + "/" + date.getFullYear().toString().slice(2);
}