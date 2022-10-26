import { ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import { VStack, Text, ScrollView, FlatList, Fab, HStack, Center, useTheme } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Plus, Warning, Image, ChatCenteredText } from 'phosphor-react-native';

import { Photo } from '../../types/provider';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProviderContext } from '../../hooks/useProviderContext';
import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';

import {
    PerfilProvider,
    InfoProvider,
    PhotosProvider,
    searchMainAdressProvider
} from '../../features/provider';
import { Loading } from '../../components/ui/Loading';
import { searchPhotosProvider } from '../../features/personalInformation.tsx';
import { CardCommentProvider, searchCommentsByIdProvider } from '../../features/commentsProvider';

export function Provider() {
    const route = useRoute<RouteProp<propsNavigationStack, "provider">>();
    const navigation = useNavigation<propsStack>();
    const { isAuthenticated, isConsumer } = useAuthContext();
    const { provider } = useProviderContext();
    const { colors } = useTheme();

    const {
        data: mainAdressProviderData,
        isSuccess: mainAdressProviderIsSuccess,
        isLoading: mainAdressProviderIsLoading,
        isError: mainAdressProviderIsErrror
    } = useQuery('mainAdressProvider', () => searchMainAdressProvider(provider.id, isAuthenticated));

    const {
        data: commentsData,
        isSuccess: commentsIsSuccess,
        isLoading: commentsIsLoading,
        isError: commentsIsErrror
    } = useQuery('commentProvider', () => searchCommentsByIdProvider(0, 3, provider.id, isAuthenticated));

    const {
        data: photosProviderData,
        isSuccess: photosProviderIsSuccess,
        isLoading: photosProviderIsLoading,
        isError: photosProviderIsError
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

                    <Text px={8} mt={4} fontFamily="body" fontSize="xs" color="gray.400">
                        {provider.description}
                    </Text>

                    <Text mt={5} px={5} fontFamily="body" fontSize="lg" color="primary.700">
                        Informações
                    </Text>

                    {
                        mainAdressProviderIsLoading &&
                        <Loading />
                    }

                    {
                        mainAdressProviderIsErrror &&
                        <Center flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text my={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao buscar as {"\n"}
                                informações do fornecedor
                            </Text>
                        </Center>
                    }

                    {
                        mainAdressProviderIsSuccess &&
                        <InfoProvider
                            provider={provider}
                            addressProvider={mainAdressProviderData}
                        />
                    }

                    <Text mt={5} px={5} fontFamily="body" fontSize="lg" color="primary.700">
                        Fotos
                    </Text>

                    {
                        photosProviderIsLoading &&
                        <Loading />
                    }

                    {
                        photosProviderIsError &&
                        <Center flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text my={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao buscar as {"\n"}
                                fotos do fornecedor
                            </Text>
                        </Center>
                    }

                    {
                        photosProviderIsSuccess &&
                        <FlatList
                            mt={4}
                            mb={commentsData === undefined || commentsData.comments.length != 0 ? 1 : 4}
                            alignSelf="center"
                            bg="background"
                            horizontal={true}
                            data={photosProviderData}
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
                            (commentsData === undefined || commentsData.comments.length != 0) &&
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
                        commentsIsLoading &&
                        <Loading />
                    }

                    {
                        !(commentsData === undefined || commentsData.comments.length != 0) &&
                        <Center my={8}>
                            <ChatCenteredText color={colors.gray[300]} size={32} />
                            <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Fornecedor ainda não possui {"\n"}
                                nenhum comentário
                            </Text>
                        </Center>
                    }

                    {
                        commentsIsErrror &&
                        <Center flex={1}>
                            <Warning color={colors.red[600]} size={32} />
                            <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                Aconteceu um erro ao buscar seus orçamentos
                            </Text>
                        </Center>
                    }

                    {
                        commentsIsSuccess &&
                        commentsData.comments.map((comment, index) => {
                            return <CardCommentProvider
                                key={index}
                                data={comment}
                            />
                        })
                    }
                </VStack>
            </ScrollView>

            {
                isConsumer && route.params?.isHirable &&
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