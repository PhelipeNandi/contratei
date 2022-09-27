import { VStack, HStack, Avatar, Text, Box, useTheme } from 'native-base';

import { DotsThreeVertical } from 'phosphor-react-native';
import { Comment } from '../../../types/provider';

type Props = {
    data: Comment;
}

export function CardCommentProvider({ data }: Props) {
    const { colors } = useTheme();

    return (
        <HStack
            mb={7}
            px={7}
            bg="background"
            justifyContent="space-between"
        >
            <HStack space={3}>
                <Avatar bg="gray.500" size="lg" source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }} />

                <Box
                    w={64}
                    shadow={5}
                    bg="gray.100"
                    rounded="lg"
                >
                    <VStack py={3} pl={5}>
                        <HStack justifyContent="space-between">
                            <Text fontFamily="mono" fontSize="md" color="primary.700">
                                {data.name}
                            </Text>

                            <HStack pr={1} space={2} justifyContent="space-between">
                                <Text fontFamily="mono" fontSize="md" color="gray.300">
                                    {data.rating}
                                </Text>

                                <DotsThreeVertical color={colors.primary[700]} />
                            </HStack>
                        </HStack>
                        <Text my={2} mx={3} fontFamily="mono" fontSize="xs" color="gray.500">
                            {data.description}
                        </Text>
                    </VStack>
                </Box>
            </HStack>
        </HStack >
    );
}