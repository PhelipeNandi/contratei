import { Box, IBoxProps, HStack, Text } from 'native-base';

type Props = IBoxProps & {
    title: string;
    value: string;
}

export function MarkedTitleWithValue({ title, value, ...rest }: Props) {
    return (
        <Box {...rest}>
            <HStack>
                <Text fontFamily="body" fontSize="xs" color="gray.700">
                    {title}: {""}
                </Text>
                <Text fontFamily="body" fontSize="xs" color="gray.300">
                    {value}
                </Text>
            </HStack>
        </Box>
    );
}