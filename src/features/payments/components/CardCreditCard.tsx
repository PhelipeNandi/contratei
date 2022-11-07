import { VStack, Box, IBoxProps, Text, HStack } from 'native-base';

import { NewCreditCard } from '../../../types/user';
import { normalizeNumberCreditCard } from '../../../utils/formatStrings';

type Props = IBoxProps & {
    data: NewCreditCard;
}

export function CardCreditCard({ data, ...rest }: Props) {
    return (
        <Box
            h={48}
            w="100%"
            bg="primary.700"
            shadow={2}
            rounded="2xl"
            alignSelf="center"
            {...rest}
        >
            <VStack
                p={5}
                alignContent="center"
            >
                <Text pt={12} fontFamily="mono" fontSize="lg" color="white">
                    {normalizeNumberCreditCard(data.number)}
                </Text>

                <Text pt={5} fontFamily="mono" fontSize="md" color="white">
                    {data.holder}
                </Text>

                <HStack alignItems="center" justifyContent="space-between">
                    <Text pt={2} fontFamily="mono" fontSize="sm" color="white">
                        {data.validity}
                    </Text>

                    <Text pt={2} fontFamily="mono" fontSize="sm" color="white">
                        {data.cvv}
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
}