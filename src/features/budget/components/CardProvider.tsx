import { Pressable, IPressableProps, HStack, Avatar, VStack, Text, Box } from 'native-base';
import { Provider } from '../../../types/user';

type Props = IPressableProps & {
    data: Provider;
}

export function CardProvider({ data, ...rest }: Props) {
    return (
        <Pressable {...rest}>
            <HStack
                alignItems="center"
            >
                <Avatar
                    size="lg"
                    bg="gray.500"
                    borderWidth={4}
                    borderColor="secondary.700"
                    source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }}
                />

                <Text pl={3} fontFamily="mono" fontSize="md" color="gray.500">
                    {data.firstName} {data.lastName}
                </Text>
            </HStack>
        </Pressable >
    );
}