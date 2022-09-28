import { Pressable, IPressableProps, Box, HStack, Text, Divider, useTheme } from 'native-base';
import { IconProps } from 'phosphor-react-native';

type Props = IPressableProps & {
    title: string;
    icon: React.ElementType<IconProps>;
}

export function MenuNavigation({ title, icon: Icon, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <Pressable {...rest}>
            <Box
                p={3}
                shadow={3}
                bg="primary.700"
                rounded="lg"
            >
                <HStack alignItems="center">
                    <Icon color={colors.white} size={20} weight="fill" />

                    <Text pl={3} textAlign="center" fontFamily="mono" fontSize="menu" color="white">
                        {title}
                    </Text>
                </HStack>
            </Box>
        </Pressable>
    );
}