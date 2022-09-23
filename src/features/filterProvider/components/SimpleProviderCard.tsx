import React from 'react';
import { Pressable, IPressableProps, HStack, Avatar, VStack, Text, useTheme } from 'native-base';
import { Smiley } from 'phosphor-react-native';

import { Provider } from '../../../types/user';

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

                <VStack justifyContent="space-between">
                    <HStack justifyContent="flex-end" alignItems="center" space={1}>
                        <Smiley size={23} color={colors.green[700]} weight="regular" />
                        <Text textAlign="center" fontFamily="mono" fontSize="md" color="primary.700">
                            9.2
                        </Text>
                    </HStack>

                    <Text textAlign="right" fontFamily="mono" fontSize="sm" color="gray.300">
                        R$ {data.hourValue}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    );
}