import React from 'react';
import { Pressable, IPressableProps, HStack, Avatar, VStack, Text } from 'native-base';

import { Provider } from '../../../types/provider';
import { RatingProvider } from '../../commentsProvider';

type Props = IPressableProps & {
    data: Provider;
}

export function SimpleProviderCard({ data, ...rest }: Props) {
    return (
        <Pressable {...rest}>
            <HStack
                p={4}
                mb={2}
                shadow={5}
                borderWidth={1}
                borderColor="primary.700"
                bg="white"
                rounded="lg"
                justifyContent="space-between"
            >
                <HStack>
                    <Avatar bg="gray.500" size="lg" source={{
                        uri: data.profilePicture != undefined ? `data:image/gif;base64,${data.profilePicture}`
                            : "https://avatars.githubusercontent.com/u/46757393?v=4"
                    }} />

                    <VStack pt={1} pl={4} space={1}>
                        <Text fontFamily="mono" fontSize="md" color="primary.700">
                            {data.firstName} {data.lastName}
                        </Text>
                        <Text fontFamily="mono" fontSize="sm" color="gray.300">
                            R$ {data.hourValue}
                        </Text>
                    </VStack>
                </HStack>

                <VStack justifyContent="flex-end">
                    {
                        data.rating &&
                        <RatingProvider
                            data={data.rating}
                        />
                    }
                </VStack>
            </HStack>
        </Pressable>
    );
}