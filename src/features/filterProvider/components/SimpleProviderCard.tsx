import React from 'react';
import { Pressable, IPressableProps, HStack, Avatar, VStack, Text, useTheme } from 'native-base';

import { Provider } from '../../../types/provider';
import { RatingProvider } from '../../commentsProvider';

type Props = IPressableProps & {
    data: Provider;
}

export function SimpleProviderCard({ data, ...rest }: Props) {
    const { colors } = useTheme();

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
                    <Avatar bg="gray.500" size="lg" source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }} />

                    <VStack pl={4} space={1}>
                        <Text fontFamily="mono" fontSize="md" color="primary.700">
                            {data.firstName} {data.lastName}
                        </Text>
                        <Text textAlign="center" fontFamily="mono" fontSize="sm" color="gray.300">
                            {data.description}
                        </Text>
                    </VStack>
                </HStack>

                <VStack justifyContent={data.rating ? "space-between" : "flex-end"}>
                    {
                        data.rating &&
                        <RatingProvider
                            data={data.rating}
                        />
                    }

                    <Text textAlign="right" fontFamily="mono" fontSize="sm" color="gray.300">
                        R$ {data.hourValue}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    );
}