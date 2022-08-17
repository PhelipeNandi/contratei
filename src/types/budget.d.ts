export interface Budget {
    id: string;
    title: string;
    type: string;
    value: string;
    inicialDate: string;
    status: 'open' | 'closed';
}