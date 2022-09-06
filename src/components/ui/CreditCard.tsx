import { VStack, Box, IBoxProps, Text } from 'native-base';

export function CreditCard({ ...rest }: IBoxProps) {
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
                    5555 5555 5555 4444
                </Text>

                <Text pt={5} fontFamily="mono" fontSize="md" color="white">
                    Phelipe de Souza Nandi
                </Text>

                <Text pt={2} fontFamily="mono" fontSize="sm" color="white">
                    02/27
                </Text>
            </VStack>
        </Box>
    );
}