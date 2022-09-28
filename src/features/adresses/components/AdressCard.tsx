import { VStack, Box, Pressable, IPressableProps, Heading, Text, HStack } from 'native-base';
import { MarkedTitleWithValue } from '../../../components/ui/MarkedTitleWithValue';
import { UserAdress } from '../../../types/user';

type Props = IPressableProps & {
    data: UserAdress;
}

export function AdressCard({ data, ...rest }: Props) {
    return (
        <Pressable {...rest}>
            <Box
                h={40}
                mx={5}
                shadow={5}
                bg="white"
                rounded="lg"
                borderWidth="1"
                borderLeftWidth={8}
                justifyContent="center"
                borderColor="primary.700"
            >
                <VStack ml={5}>
                    <Heading fontFamily="body" size="sm" color="primary.700">
                        Endereço Principal
                    </Heading>

                    <MarkedTitleWithValue
                        mt={2}
                        title="Rua"
                        value={data.street}
                    />

                    <MarkedTitleWithValue
                        title="Número"
                        value={data.numberStreet}
                    />

                    <MarkedTitleWithValue
                        title="CEP"
                        value={data.postCode}
                    />

                    <MarkedTitleWithValue
                        title="Cidade"
                        value={data.city}
                    />

                    <MarkedTitleWithValue
                        title="Estado"
                        value={data.state}
                    />
                </VStack>
            </Box>
        </Pressable>
    );
}