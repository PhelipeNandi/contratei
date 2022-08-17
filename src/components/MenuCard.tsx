import { Flex, HStack, Text, Pressable, IPressableProps } from 'native-base';
import { IconProps } from 'phosphor-react-native';

type MenuCardProps = IPressableProps & {
    title: string;
    colorCard: string;
    colorFont: string;
    icon: React.ElementType<IconProps>;
}

export function MenuCard({ title, colorCard, colorFont, icon: Icon, ...rest }: MenuCardProps) {
    return (
        <Pressable {...rest}>
            <Flex
                h={24}
                w={40}
                mt={5}
                px={2}
                shadow={4}
                rounded="lg"
                bg={colorCard}
            >
                <HStack p={2} justifyContent="flex-end">
                    <Icon color={colorFont} />
                </HStack>

                <Text pl={2} fontFamily="mono" fontSize="md" color={colorFont}>
                    {title}
                </Text>
            </Flex>
        </Pressable>
    );
}