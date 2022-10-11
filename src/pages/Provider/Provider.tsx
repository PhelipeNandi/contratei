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
import { searchPhotosProvider } from '../../features/personalInformation.tsx';

export function Provider() {
    const navigation = useNavigation<propsStack>();
    const { isAuthenticated, isConsumer } = useAuthContext();
    const { provider } = useProviderContext();
    const { colors } = useTheme();

    const {
        data,
        isSuccess,
        isLoading,
        isError
    } = useQuery('commentProvider', () => searchCommentsByIdProvider(0, 3, provider.id, isAuthenticated));

    const {
        data: dataPhotosProvider,
        isSuccess: isSuccessPhotosProvider,
        isLoading: isLoadingPhotosProvider,
        isError: isErrorPhotosProvider
    } = useQuery('photosProvider', () => searchPhotosProvider(provider.id, isAuthenticated));

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

                    {
                        isLoadingPhotosProvider &&
                        <Loading />
                    }

                    {
                        isErrorPhotosProvider &&
                        <Center flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text my={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao buscar as {"\n"}
                                fotos do fornecedor
                            </Text>
                        </Center>
                    }

                    {
                        isSuccessPhotosProvider &&
                        <FlatList
                            mt={4}
                            mb={data === undefined || data.comments.length != 0 ? 1 : 4}
                            alignSelf="center"
                            bg="background"
                            horizontal={true}
                            data={dataPhotosProvider}
                            keyExtractor={photo => photo.id.toString()}
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
                    }

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