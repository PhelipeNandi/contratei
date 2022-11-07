import { GestureResponderEvent } from 'react-native';
import { HStack, IPressableProps, Pressable, Text, useTheme, Box, IconButton } from 'native-base';
import { CreditCard as CreditCardIcon, TrashSimple } from 'phosphor-react-native';

import { maskNumberCreditCard } from '../../../utils/masks';

type Props = IPressableProps & {
    number: string;
    onDeleteCreditCard?: (onPress: GestureResponderEvent) => void;
}

export function ItemCreditCard({ number, onDeleteCreditCard, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <Pressable {...rest}>
            <Box
                h={16}
                p={5}
                shadow={5}
                bg="white"
                rounded="lg"
                borderWidth="1"
                borderLeftWidth={12}
                justifyContent="center"
                borderColor="primary.700"
            >
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center">
                        <CreditCardIcon color={colors.primary[700]} size={32} />

                        <Text pl={4} fontFamily="body" fontSize="sm" color="primary.700">
                            {
                                maskNumberCreditCard(number)
                            }
                        </Text>
                    </HStack>

                    <IconButton
                        onPress={onDeleteCreditCard}
                        icon={<TrashSimple color={colors.red[700]} size={20} weight="fill" />}
                    />
                </HStack>
            </Box>
        </Pressable >
    );
}