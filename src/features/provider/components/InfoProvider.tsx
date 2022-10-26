import { VStack } from 'native-base';

import { normalizeServiceType } from '../../../utils/formatStrings';
import { Provider, ProviderMainAddress } from '../../../types/provider';
import { MarkedTitleWithValue } from '../../../components/ui/MarkedTitleWithValue';

type Props = {
    provider: Provider;
    addressProvider: ProviderMainAddress;
}

export function InfoProvider({ provider, addressProvider }: Props) {
    return (
        <VStack px={8} mt={4}>
            <MarkedTitleWithValue
                title="Tipo de Serviço"
                value={normalizeServiceType(provider.serviceType)}
            />

            <MarkedTitleWithValue
                title="Cidade"
                value={addressProvider.city}
            />

            <MarkedTitleWithValue
                title="Bairro"
                value={addressProvider.district}
            />

            <MarkedTitleWithValue
                title="Rua"
                value={addressProvider.street}
            />

            <MarkedTitleWithValue
                title="Número"
                value={addressProvider.numberStreet}
            />

            <MarkedTitleWithValue
                title="CEP"
                value={addressProvider.postCode}
            />

            <MarkedTitleWithValue
                title="Telefone"
                value={provider.contactNumber}
            />

            <MarkedTitleWithValue
                title="E-mail"
                value={provider.email}
            />
        </VStack>
    );
}