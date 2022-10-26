import { Pressable, IPressableProps, HStack, Avatar, VStack, Text, Box } from 'native-base';
import { ConsumerBudget, ProviderBudget } from '../../../types/provider';

type Props = IPressableProps & {
    provider?: ProviderBudget;
    consumer?: ConsumerBudget;
}

export function UserCard({ provider, consumer, ...rest }: Props) {
    const data = {
        firstName: provider ? provider.firstName : consumer.firstName,
        lastName: provider ? provider.lastName : consumer.lastName,
        profilePicture: provider ? provider.profilePicture : consumer.profilePicture
    }

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
                    source={{
                        uri: data.profilePicture ? `data:image/gif;base64,${data.profilePicture}`
                            : "https://avatars.githubusercontent.com/u/46757393?v=4"
                    }}
                />

                <Text pl={3} fontFamily="mono" fontSize="md" color="gray.500">
                    {data.firstName} {data.lastName}
                </Text>
            </HStack>
        </Pressable>
    );
}