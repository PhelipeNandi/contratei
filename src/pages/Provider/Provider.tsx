import { ListRenderItemInfo } from 'react-native';
import { VStack, Text, ScrollView, FlatList, Fab, HStack, Center, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Plus, Warning, Image, ChatCenteredText } from 'phosphor-react-native';

import { propsStack } from '../../routes/Navigators/Models';

import {
    PerfilProvider,
    InfoProvider,
    PhotosProvider
} from '../../features/provider';
import { CardCommentProvider, searchCommentsByIdProvider } from '../../features/commentsProvider';

import { Photo, Comment } from '../../types/provider';
import { useProviderContext } from '../../hooks/useProviderContext';
import { useQuery } from 'react-query';
import { Loading } from '../../components/ui/Loading';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from '../../components/ui/Button';

export function Provider() {
    const navigation = useNavigation<propsStack>();
    const { isAuthenticated, isConsumer } = useAuthContext();
    const { provider } = useProviderContext();
    const { colors } = useTheme();

    const urls: Photo[] = [
        // {
        //     id: 5,
        //     url: "https://images.unsplash.com/photo-1622613371413-5c0da41cbc4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80"
        // },
        // {
        //     id: 4,
        //     url: "https://www.apple.com/newsroom/images/environments/stores/standard/Apple_Changsha_VideoWall_09012021_big.jpg.slideshow-large_2x.jpg"
        // },
        // {
        //     id: 3,
        //     url: "https://static.wikia.nocookie.net/ipod/images/d/dc/Apple_Changsha_R617-2022-09.jpg/revision/latest?cb=20220528150453"
        // },
        // {
        //     id: 2,
        //     url: "https://www.apple.com/newsroom/images/environments/stores/standard/Apple_Changsha_RetailTeamMembers_09012021_big.jpg.slideshow-xlarge_2x.jpg"
        // },
        // {
        //     id: 1,
        //     url: "https://i2.wp.com/clipset.com/wp-content/uploads/2018/07/Apple-Store-Garosugil-Seul.jpg?fit=900%2C600&ssl=1"
        // }
    ]

    const {
        data,
        isSuccess,
        isLoading,
        isError
    } = useQuery('commentProvider', () => searchCommentsByIdProvider(0, 3, provider.id, isAuthenticated));

    function renderPhotosProvider({ item }: ListRenderItemInfo<Photo>) {
        return <PhotosProvider
            photos={item}
        />
    }

    return (
        <VStack flex={1} bg="background">
            <ScrollView>
                <PerfilProvider
                    imageProfile={provider.profilePicture}
                    backgroundImage={provider.backgroundImage}
                />

                <VStack>
                    <Text mt={5} px={5} fontFamily="body" fontSize="subTitle" color="primary.700">
                        {provider.firstName} {provider.lastName}
                    </Text>

                    <Text px={10} mt={4} fontFamily="body" fontSize="xs" color="gray.400">
                        {provider.lastName}
                    </Text>

                    <Text mt={5} px={5} fontFamily="body" fontSize="lg" color="primary.700">
                        Informações
                    </Text>

                    <InfoProvider />

                    <Text mt={5} px={5} fontFamily="body" fontSize="lg" color="primary.700">
                        Fotos
                    </Text>

                    <FlatList
                        mt={4}
                        mb={data === undefined || data.comments.length != 0 ? 1 : 4}
                        alignSelf="center"
                        bg="background"
                        horizontal={true}
                        data={urls}
                        keyExtractor={url => url.id.toString()}
                        renderItem={renderPhotosProvider}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <Center my={2}>
                                <Image color={colors.gray[300]} size={32} />
                                <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                    Fornecedor ainda não possui {"\n"}
                                    nenhuma foto cadastrada
                                </Text>
                            </Center>
                        )}
                    />

                    <HStack
                        px={5}
                        my={1}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text fontFamily="body" fontSize="lg" color="primary.700">
                            Comentários
                        </Text>
                        {
                            (data === undefined || data.comments.length != 0) &&
                            <Text
                                fontFamily="body"
                                fontSize="xs"
                                color="primary.700"
                                onPress={() => navigation.navigate("commentsProvider")}
                            >
                                Ver todos
                            </Text>
                        }
                    </HStack>

                    {
                        isLoading &&
                        <Loading />
                    }

                    {
                        !(data === undefined || data.comments.length != 0) &&
                        <Center my={8}>
                            <ChatCenteredText color={colors.gray[300]} size={32} />
                            <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Fornecedor ainda não possui {"\n"}
                                nenhum comentário
                            </Text>
                        </Center>
                    }

                    {
                        isError &&
                        <Center flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao buscar seus orçamentos
                            </Text>
                        </Center>
                    }

                    {
                        isSuccess &&
                        data.comments.map((comment, index) => {
                            return <CardCommentProvider
                                key={index}
                                data={comment}
                            />
                        })
                    }
                </VStack>
            </ScrollView>

            {
                isConsumer &&
                <Fab
                    renderInPortal={false}
                    shadow={2}
                    placement="bottom-right"
                    size="md"
                    bg="primary.700"
                    icon={<Plus color="white" size="15" />}
                />
            }
        </VStack >
    );
}