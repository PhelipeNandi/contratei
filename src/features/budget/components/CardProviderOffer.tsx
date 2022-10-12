import { GestureResponderEvent } from 'react-native';
import { HStack, Avatar, Text, VStack, Pressable, IPressableProps, Box, IconButton, useTheme } from 'native-base';
import { TrashSimple, ClipboardText } from 'phosphor-react-native';

import { Provider } from '../../../types/provider';

type Props = IPressableProps & {
    data: Provider;
    onPressOffer?: (onPress: GestureResponderEvent) => void;
    onPressRefuse?: (onPress: GestureResponderEvent) => void;
}

export function CardProviderOffer({ data, onPressOffer, onPressRefuse, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <HStack my={3} justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Pressable {...rest}>
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
                </Pressable>

                <Text pl={3} fontFamily="mono" fontSize="md" color="gray.500">
                    {data.firstName} {data.lastName}
                </Text>
            </HStack>

            <HStack space={6}>
                <VStack alignItems="center">
                    <IconButton
                        onPress={onPressOffer}
                        icon={<ClipboardText color={colors.primary[700]} size={25} weight="fill" />}
                    />
                    <Text fontFamily="mono" fontSize="xs" color="primary.700">
                        Proposta
                    </Text>
                </VStack>

                <VStack alignItems="center">
                    <IconButton
                        onPress={onPressRefuse}
                        icon={<TrashSimple color={colors.red[600]} size={25} weight="fill" />}
                    />
                    <Text fontFamily="mono" fontSize="xs" color="red.600">
                        Recusar
                    </Text>
                </VStack>
            </HStack>
        </HStack >
    );
}