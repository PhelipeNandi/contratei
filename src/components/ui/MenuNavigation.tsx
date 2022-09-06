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
            <Box>
                <HStack alignItems="center">
                    <Icon color={colors.primary[700]} size={24} weight="bold" />

                    <Text pl={3} fontFamily="mono" fontSize="menu" color="primary.700">
                        {title}
                    </Text>
                </HStack>
            </Box>

            <Divider
                mt={2}
                thickness={1}
                bg="primary.700"
            />
        </Pressable>
    );
}