import { Flex, HStack, Text, Pressable, IPressableProps, useTheme, Divider } from 'native-base';
import { IconProps } from 'phosphor-react-native';

type MenuCardProps = IPressableProps & {
    title: string;
    icon: React.ElementType<IconProps>;
}

export function ButtonNavigation({ title, icon: Icon, ...rest }: MenuCardProps) {
    const { colors } = useTheme();

    return (
        <Pressable {...rest}>
            <Flex
                mt={5}
                px={2}
                justifyContent="center"
                shadow={4}
                rounded="lg"
                bg="white"
            >
                <HStack p={4}>
                    <Icon color={colors.gray[700]} />

                    <Divider thickness="3" mx="4" orientation="vertical" />

                    <Text fontFamily="mono" fontSize="md" color="gray.700">
                        {title}
                    </Text>
                </HStack>
            </Flex>
        </Pressable>
    );
}