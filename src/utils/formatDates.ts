import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const normalizeDateCardBudget = (value: string | undefined) => {
    if (!value) return '';

    return format(parseISO(value), 'dd MMM', { locale: ptBR });
}