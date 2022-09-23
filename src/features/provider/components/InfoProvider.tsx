import { VStack, Text, HStack } from 'native-base';

import { MarkedTitleWithValue } from '../../../components/ui/MarkedTitleWithValue';

import { Provider } from '../../../types/user';

type Props = {
    data?: Provider;
}

export function InfoProvider({ data }: Props) {
    return (
        <VStack px={8} mt={4}>
            <MarkedTitleWithValue
                title="Tipo de Serviço"
                value="Mecanico"
            />

            <MarkedTitleWithValue
                title="Cidade"
                value="Tubarão"
            />

            <MarkedTitleWithValue
                title="Bairro"
                value="Monte Castelo"
            />

            <MarkedTitleWithValue
                title="Rua"
                value="José Bressan"
            />

            <MarkedTitleWithValue
                title="Número"
                value="80"
            />

            <MarkedTitleWithValue
                title="Telefone"
                value="(48) 99638-5477"
            />

            <MarkedTitleWithValue
                title="E-mail"
                value="fornecedor1@provider.com"
            />
        </VStack>
    );
}