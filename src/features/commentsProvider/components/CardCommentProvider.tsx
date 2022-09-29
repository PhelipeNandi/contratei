import { VStack, HStack, Avatar, Text, Box, useTheme } from 'native-base';
import { DotsThreeVertical, Smiley, SmileySad } from 'phosphor-react-native';

import { Comment } from '../../../types/provider';
import { normalizeRatingProvider } from '../../../utils/formatStrings';

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
                <Avatar
                    bg="gray.500"
                    size="lg"
                    source={{
                        uri: data.photo ? `data:image/gif;base64,${data.photo}`
                            : "https://avatars.githubusercontent.com/u/46757393?v=4"
                    }}
                />

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

                            <HStack pr={3} space={2} justifyContent="space-between">
                                {
                                    normalizeRatingProvider(data.rating) < 6
                                        ? <SmileySad size={23} color={colors.red[700]} weight="regular" />
                                        : <Smiley size={23} color={colors.green[700]} weight="regular" />
                                }

                                <Text textAlign="center" fontFamily="mono" fontSize="md" color="primary.700">
                                    {normalizeRatingProvider(data.rating)}
                                </Text>
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