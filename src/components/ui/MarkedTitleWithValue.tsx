import { HStack, Text } from 'native-base';

type Props = {
    title: string;
    value: string;
}

export function MarkedTitleWithValue({ title, value }: Props) {
    return (
        <HStack>
            <Text fontFamily="body" fontSize="xs" color="gray.700">
                {title}: {""}
            </Text>
            <Text fontFamily="body" fontSize="xs" color="gray.300">
                {value}
            </Text>
        </HStack>
    );
}