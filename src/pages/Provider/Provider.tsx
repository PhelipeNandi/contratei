import { ListRenderItemInfo } from 'react-native';
import { VStack, Text, ScrollView, FlatList, Fab, HStack, Avatar } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Plus } from 'phosphor-react-native';

import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';

import {
    PerfilProvider,
    InfoProvider,
    PhotosProvider,
    CommentsProvider,
    AddNewComment
} from '../../features/provider';

import { Photo, Comment } from '../../types/provider';

export function Provider() {
    const route = useRoute<RouteProp<propsNavigationStack, "provider">>();
    const navigation = useNavigation<propsStack>();

    const urls: Photo[] = [
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1622613371413-5c0da41cbc4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80"
        },
        {
            id: 4,
            url: "https://www.apple.com/newsroom/images/environments/stores/standard/Apple_Changsha_VideoWall_09012021_big.jpg.slideshow-large_2x.jpg"
        },
        {
            id: 3,
            url: "https://static.wikia.nocookie.net/ipod/images/d/dc/Apple_Changsha_R617-2022-09.jpg/revision/latest?cb=20220528150453"
        },
        {
            id: 2,
            url: "https://www.apple.com/newsroom/images/environments/stores/standard/Apple_Changsha_RetailTeamMembers_09012021_big.jpg.slideshow-xlarge_2x.jpg"
        },
        {
            id: 1,
            url: "https://i2.wp.com/clipset.com/wp-content/uploads/2018/07/Apple-Store-Garosugil-Seul.jpg?fit=900%2C600&ssl=1"
        }
    ]

    const comments: Comment[] = [
        {
            idComent: 3,
            idConsumer: 1,
            name: "Phelipe Nandi",
            photo: {
                id: 1,
                url: "https://avatars.githubusercontent.com/u/46757393?v=4"
            },
            rating: 9.2,
            description: "Meu comentário"
        }, {
            idComent: 2,
            idConsumer: 1,
            name: "Phelipe Nandi",
            photo: {
                id: 1,
                url: "https://avatars.githubusercontent.com/u/46757393?v=4"
            },
            rating: 9.2,
            description: "Meu comentário"
        }, {
            idComent: 1,
            idConsumer: 1,
            name: "Phelipe Nandi",
            photo: {
                id: 1,
                url: "https://avatars.githubusercontent.com/u/46757393?v=4"
            },
            rating: 9.2,
            description: "Meu comentário"
        }
    ]

    function renderPhotosProvider({ item }: ListRenderItemInfo<Photo>) {
        return <PhotosProvider
            photos={item}
        />
    }

    return (
        <VStack flex={1} bg="background">
            <ScrollView>
                <PerfilProvider />

                <VStack>
                    <Text mt={5} px={5} fontFamily="body" fontSize="subTitle" color="primary.700">
                        Fornecedor 1
                    </Text>

                    <Text px={10} mt={4} fontFamily="body" fontSize="xs" color="gray.400">
                        Essa aqui é minha descrição como fornecedor
                    </Text>

                    <Text mt={5} px={5} fontFamily="body" fontSize="md" color="primary.700">
                        Informações
                    </Text>

                    <InfoProvider />

                    <Text mt={5} px={5} fontFamily="body" fontSize="md" color="primary.700">
                        Fotos
                    </Text>

                    <FlatList
                        mt={4}
                        pl={2}
                        bg="background"
                        horizontal={true}
                        data={urls}
                        keyExtractor={url => url.id.toString()}
                        renderItem={renderPhotosProvider}
                        showsHorizontalScrollIndicator={false}
                    />

                    <HStack
                        mt={5}
                        px={5}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text fontFamily="body" fontSize="md" color="primary.700">
                            Comentários
                        </Text>
                        <Text fontFamily="body" fontSize="xs" color="primary.700">
                            Ver todos
                        </Text>
                    </HStack>

                    {
                        comments.map((comment, index) => {
                            return <CommentsProvider key={index}
                                data={comment}
                            />
                        })
                    }

                    <AddNewComment />

                </VStack>
            </ScrollView>

            <Fab
                renderInPortal={false}
                shadow={2}
                placement="bottom-left"
                size="sm"
                bg="primary.700"
                icon={<Plus color="white" size="20" />}
            />
        </VStack >
    );
}