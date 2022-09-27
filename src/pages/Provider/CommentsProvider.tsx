import { ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VStack, HStack, Box, IconButton, Text, FlatList, Fab } from 'native-base';
import { ArrowLeft, Plus } from 'phosphor-react-native';
import { propsStack } from '../../routes/Navigators/Models';

import { Comment } from '../../types/provider';

import { CardCommentProvider } from '../../features/commentsProvider';

export function CommentsProvider() {
    const navigation = useNavigation<propsStack>();

    const comments: Comment[] = [
        {
            idComent: 3,
            idConsumer: 1,
            name: "Phelipe Nandi",
            photo: {
                id: 1,
                url: "https://avatars.githubusercontent.com/u/46757393?v=4"
            },
            rating: "9.2",
            description: "Meu comentário"
        }, {
            idComent: 2,
            idConsumer: 1,
            name: "Phelipe Nandi",
            photo: {
                id: 1,
                url: "https://avatars.githubusercontent.com/u/46757393?v=4"
            },
            rating: "9.2",
            description: "Meu comentário"
        }, {
            idComent: 1,
            idConsumer: 1,
            name: "Phelipe Nandi",
            photo: {
                id: 1,
                url: "https://avatars.githubusercontent.com/u/46757393?v=4"
            },
            rating: "9.2",
            description: "Meu comentário"
        }
    ]

    function renderCommentsProvider({ item }: ListRenderItemInfo<Comment>) {
        return <CardCommentProvider
            data={item}
        />
    }

    return (
        <VStack flex={1} bg="background">
            <HStack
                mt={12}
                px={5}
                alignItems="center"
            >
                <Box maxW={16} bg="white" rounded="lg" borderWidth="1" borderColor="primary.700" shadow={1}>
                    <IconButton
                        _pressed={{ backgroundColor: "primary.700" }}
                        icon={<ArrowLeft color="black" size={24} />}
                        onPress={() => navigation.goBack()}
                    />
                </Box>
                <Text pl={4} textAlign="center" fontFamily="body" fontSize="lg" color="gray.400">
                    Comentários do {""}
                </Text>
                <Text textAlign="center" fontFamily="body" fontSize="lg" color="primary.700">
                    Fornecedor
                </Text>
            </HStack>

            <FlatList
                mt={10}
                bg="background"
                data={comments}
                keyExtractor={comment => comment.idComent.toString()}
                renderItem={renderCommentsProvider}
                showsVerticalScrollIndicator={false}
            />

            <Fab
                renderInPortal={false}
                shadow={2}
                placement="bottom-right"
                size="md"
                bg="primary.700"
                icon={<Plus color="white" size="15" />}
                onPress={() => navigation.navigate("createNewCommentProvider")}
            />
        </VStack>
    );
}