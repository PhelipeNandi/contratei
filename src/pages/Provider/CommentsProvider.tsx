import { ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VStack, HStack, Box, IconButton, Text, FlatList, Fab, Center, useTheme } from 'native-base';
import { ArrowLeft, Plus, Warning } from 'phosphor-react-native';
import { propsStack } from '../../routes/Navigators/Models';
import { useInfiniteQuery } from 'react-query';

import { Comment } from '../../types/provider';

import { CardCommentProvider, searchCommentsByIdProvider } from '../../features/commentsProvider';
import { useProviderContext } from '../../hooks/useProviderContext';
import { Loading } from '../../components/ui/Loading';
import { useAuthContext } from '../../hooks/useAuthContext';

export function CommentsProvider() {
    const navigation = useNavigation<propsStack>();
    const { isAuthenticated } = useAuthContext();
    const { provider, isNewCommentDisable } = useProviderContext();
    const { colors } = useTheme();

    const {
        data,
        isSuccess,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery("comments",
        ({ pageParam = 0 }) => searchCommentsByIdProvider(pageParam, 5, provider.id, isAuthenticated), {
        getNextPageParam: (page) => {
            if (page.currentPage < page.totalPages) {
                return page.currentPage + 1;
            }
            return false;
        }
    });

    function handleFetchNextPaget() {
        if (hasNextPage) {
            fetchNextPage();
        }
    }

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

            {
                isLoading &&
                <Loading />
            }

            {
                isError &&
                <Center flex={1}>
                    <Warning color={colors.red[600]} size={32} />
                    <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                        Aconteceu um erro ao buscar {"\n"}
                        os comentários
                    </Text>
                </Center>
            }

            {
                isSuccess &&
                <FlatList
                    mt={10}
                    bg="background"
                    data={data.pages.map((commentResponse) => commentResponse.comments).flat()}
                    keyExtractor={comment => comment.idComent.toString()}
                    renderItem={renderCommentsProvider}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleFetchNextPaget}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        isFetchingNextPage && <Loading my={10} />
                    }
                />
            }

            {
                isNewCommentDisable &&
                <Fab
                    renderInPortal={false}
                    shadow={2}
                    placement="bottom-right"
                    size="md"
                    bg="primary.700"
                    icon={<Plus color="white" size="15" />}
                    onPress={() => navigation.navigate("createNewCommentProvider")}
                />
            }

        </VStack>
    );
}