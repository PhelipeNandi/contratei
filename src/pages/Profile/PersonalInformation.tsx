import { useState, useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
    VStack, HStack, Box, ScrollView, useTheme,
    Text, IconButton, FlatList, Center,
    Button as NativeBaseButton
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { PlusCircle, Image as IconImage, Warning, PencilSimple } from 'phosphor-react-native';

import { Photo } from '../../types/provider';
import { propsStack } from '../../routes/Navigators/Models';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ChangePersonalInformation } from '../../types/user';
import { normalizeCPF, normalizeContactNumberValue } from '../../utils/masks';

import { Header } from '../../components/ui/Header';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/form/Modal';
import { TextArea } from '../../components/form/TextArea';
import { PhotosProvider } from '../../features/provider';
import {
    changePersonalInformation,
    pickImage,
    searchPhotosProvider,
    SelectActingRegion,
    PhotoProvider,
    PhotoCosumer
} from '../../features/personalInformation.tsx';
import { Loading } from '../../components/ui/Loading';

const PhotoSchema: yup.SchemaOf<Photo> = yup.object({
    id: yup.number().nullable(),
    url: yup.string().nullable()
})

const changePersonalInformationForm: yup.SchemaOf<ChangePersonalInformation> = yup.object({
    firstName: yup.string().required("Nome obrigatório"),
    lastName: yup.string().required("Sobrenome obrigatório"),
    contactNumber: yup.string().required("Telefone obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    description: yup.string().nullable(),
    hourValue: yup.string().nullable(),
    actingRegion: yup.string().nullable(),
    profilePicture: yup.string().nullable(),
    backgroundImage: yup.string().nullable(),
    photosProvider: yup.array().of(PhotoSchema.defined()).nullable()
});

export function PersonalInformation() {
    const { colors } = useTheme();
    const queryClient = useQueryClient();
    const navigation = useNavigation<propsStack>();
    const { user, changePersonalInformationUser, isConsumer } = useAuthContext();
    const [imageProfile, setImageProfile] = useState(user.profilePicture);
    const [backgroundImage, setBackgroundImage] = useState(user.backgroundImage);
    const [photosProvider, setPhotosProvider] = useState<Photo[]>([]);
    const [photoProviderSelect, setPhotoProviderSelect] = useState<Photo>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<ChangePersonalInformation>({
        resolver: yupResolver(changePersonalInformationForm),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            contactNumber: user.contactNumber,
            cpf: user.cpf,
            email: user.email,
            description: user.description,
            hourValue: user.hourValue ? user.hourValue : "",
            actingRegion: user.actingRegion,
            profilePicture: user.profilePicture,
            backgroundImage: user.backgroundImage
        }
    });

    const contactNumberValue = watch('contactNumber');
    const cpfValue = watch('cpf');

    useEffect(() => {
        setValue('contactNumber', normalizeContactNumberValue(contactNumberValue))
    }, [contactNumberValue]);

    useEffect(() => {
        setValue('cpf', normalizeCPF(cpfValue))
    }, [cpfValue]);

    async function pickImageProfile() {
        await pickImage()
            .then((image) => {
                if (image) {
                    setImageProfile(image);
                    setValue('profilePicture', image);
                }
            });
    }

    async function pickBackgroundImage() {
        await pickImage()
            .then((image) => {
                if (image) {
                    setBackgroundImage(image);
                    setValue('backgroundImage', image);
                }
            });
    }

    const {
        isSuccess,
        isLoading,
        data,
        mutate,
    } = useMutation((data: ChangePersonalInformation) => changePersonalInformation(data, user));

    useEffect(() => {
        if (isSuccess) {
            queryClient.invalidateQueries("photosProvider");
            changePersonalInformationUser(data);
            navigation.navigate("profile");
        }
    }, [isSuccess]);

    const {
        isSuccess: isSuccessPhotosProvider,
        isLoading: isLoadingPhotosProvider,
        isError: isErrorPhotosProvider
    } = useQuery("photosProviderPersonalInformation", () => searchPhotosProvider(user.id), {
        enabled: !isConsumer,
        onSuccess: (data) => {
            setPhotosProvider(data);
        }
    });

    function renderPhotosProvider({ item }: ListRenderItemInfo<Photo>) {
        return <PhotosProvider
            photos={item}
            onPress={() => {
                setPhotoProviderSelect(item);
                setShowModal(true);
            }}
        />
    }

    async function pickPhotoProvider() {
        await pickImage()
            .then((image) => {
                if (image) {
                    setPhotosProvider((prevPhotosProvider) => [
                        ...prevPhotosProvider,
                        {
                            url: image
                        }
                    ])
                }
            });
    }

    useEffect(() => {
        if (photosProvider) {
            setValue("photosProvider", photosProvider);
        }
    }, [photosProvider])

    function handleRemovePhotoProvider() {
        setPhotosProvider(photoProvider => photoProvider.filter(photo => photo.url !== photoProviderSelect.url));
        setShowModal(false);
    }

    return (
        <VStack flex={1} bg="background">

            <Header title="Informações Pessoais" />

            <ScrollView>

                <VStack flex={1} px={5} bg="background">

                    {
                        isConsumer
                            ? <PhotoCosumer
                                imageProfile={imageProfile}
                                onPress={pickImageProfile}
                            />
                            : <PhotoProvider
                                backgroundImage={backgroundImage}
                                imageProfile={imageProfile}
                                onPress={pickImageProfile}
                                children={
                                    <IconButton
                                        icon={<PencilSimple color="white" size={24} />}
                                        onPress={pickBackgroundImage}
                                    />
                                }
                            />
                    }

                    <HStack mt={6} justifyContent="space-between">
                        <Box flex={1}>
                            <Controller
                                control={control}
                                name="firstName"
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        mb={5}
                                        title="Nome"
                                        value={value}
                                        onChangeText={onChange}
                                        errorMessage={errors.firstName?.message}
                                    />
                                )}
                            />
                        </Box>

                        <Box flex={1} pl={2}>
                            <Controller
                                control={control}
                                name="lastName"
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        mb={5}
                                        title="Sobrenome"
                                        value={value}
                                        onChangeText={onChange}
                                        errorMessage={errors.lastName?.message}
                                    />
                                )}
                            />
                        </Box>
                    </HStack>


                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mb={5}
                                title="E-mail"
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="cpf"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mb={5}
                                title="CPF"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                errorMessage={errors.cpf?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="contactNumber"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mb={5}
                                title="Telefone"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                errorMessage={errors.contactNumber?.message}
                            />
                        )}
                    />

                    {
                        !isConsumer &&
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { value, onChange } }) => (
                                <TextArea
                                    mb={5}
                                    title="Descrição"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.description?.message}
                                />
                            )}
                        />
                    }

                    {
                        !isConsumer &&
                        <Controller
                            control={control}
                            name="hourValue"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    mb={5}
                                    title="Valor médio"
                                    value={value.toString()}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                    errorMessage={errors.hourValue?.message}
                                />
                            )}
                        />
                    }

                    {
                        !isConsumer &&
                        <Controller
                            control={control}
                            name="actingRegion"
                            render={({ field: { value, onChange } }) => (
                                <SelectActingRegion
                                    mb={3}
                                    title="Região de Atuação"
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    errorMessage={errors.actingRegion?.message}
                                />
                            )}
                        />

                    }
                </VStack>

                {
                    !isConsumer &&
                    <VStack space={4}>
                        <HStack mx={5} justifyContent="space-between" alignItems="center">
                            <Text fontFamily="body" fontSize="xs" color="gray.300">
                                Fotos
                            </Text>
                            <IconButton
                                disabled={photosProvider.length >= 5}
                                icon={<PlusCircle color={colors.gray[300]} size={20} />}
                                onPress={() => pickPhotoProvider()}
                            />
                        </HStack>

                        {
                            isLoadingPhotosProvider &&
                            <Loading />
                        }

                        {
                            isErrorPhotosProvider &&
                            <Center my={2}>
                                <Warning color={colors.gray[300]} size={32} />
                                <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                    Ocorreu um erro {"\n"}
                                    ao buscar as fotos
                                </Text>
                            </Center>
                        }

                        {
                            isSuccessPhotosProvider &&
                            <FlatList
                                alignSelf="center"
                                bg="background"
                                horizontal={true}
                                data={photosProvider}
                                keyExtractor={photo => photo.url + Math.random()}
                                renderItem={renderPhotosProvider}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <Center my={2}>
                                        <IconImage color={colors.gray[300]} size={32} />
                                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                            Você ainda não possui {"\n"}
                                            nenhuma foto cadastrada
                                        </Text>
                                    </Center>
                                )}
                            />
                        }
                    </VStack>
                }

                <Button
                    my={5}
                    mx={5}
                    title="Salvar"
                    variant="sucess"
                    isLoading={isLoading}
                    isLoadingText="Salvando"
                    onPress={handleSubmit((value) => mutate(value))}
                />

                <Modal
                    header="Exclusão"
                    body="Você quer remover essa foto?"
                    icon={IconImage}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <NativeBaseButton.Group space={2}>
                        <Button
                            title="Cancelar"
                            variant="primary"
                            onPress={() => setShowModal(false)}
                        />
                        <Button
                            title="Excluir"
                            variant="danger"
                            onPress={handleRemovePhotoProvider}
                        />
                    </NativeBaseButton.Group>
                </Modal>

            </ScrollView >

        </VStack >
    );
}