import { useState, useEffect } from 'react';
import { VStack, Avatar, HStack, Box, ScrollView, useTheme, Circle, Pressable } from 'native-base';
import { useMutation } from 'react-query';
import { Camera } from 'phosphor-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { ChangePersonalInformation } from '../../types/user';
import { useAuthContext } from '../../hooks/useAuthContext';
import { normalizeCPF, normalizeContactNumberValue } from '../../utils/masks';

import { Header } from '../../components/ui/Header';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/form/TextArea';
import { changePersonalInformation } from '../../features/personalInformation.tsx';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/Navigators/Models';
import { useProviderContext } from '../../hooks/useProviderContext';

const changePersonalInformationForm: yup.SchemaOf<ChangePersonalInformation> = yup.object({
    firstName: yup.string().required("Nome obrigatório"),
    lastName: yup.string().required("Sobrenome obrigatório"),
    contactNumber: yup.string().required("Telefone obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    description: yup.string().nullable(),
    kmWorkRange: yup.string().nullable(),
    hourValue: yup.string().nullable(),
    profilePicture: yup.string().nullable(),
    backgroundImage: yup.string().nullable()
});

export function PersonalInformation() {
    const { colors } = useTheme();
    const navigation = useNavigation<propsStack>();
    const { searchProvider } = useProviderContext();
    const { user, changePersonalInformationUser, isConsumer } = useAuthContext();
    const [imageProfile, setImageProfile] = useState(user.profilePicture);

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
            kmWorkRange: user.kmWorkRange,
            hourValue: user.hourValue,
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
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!image.cancelled) {
            //@ts-ignore
            const base64 = image.base64;

            setImageProfile(base64);
            setValue('profilePicture', base64);
        }
    }

    const {
        isSuccess,
        isLoading,
        data,
        mutate,
    } = useMutation((data: ChangePersonalInformation) => changePersonalInformation(data, user));

    useEffect(() => {
        if (isSuccess) {
            changePersonalInformationUser(data);
            navigation.navigate("profile");
        }
    }, [isSuccess]);

    async function handleNavigateProvider() {
        await searchProvider(user.id)
            .then(() => {
                navigation.navigate("provider");
            })
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            });
    }

    return (
        <VStack flex={1}>

            <Header title="Informações Pessoais" />

            <ScrollView>

                <VStack flex={1} px={5} bg="background">

                    <Pressable onPress={pickImageProfile}>
                        <Avatar
                            mt={8}
                            alignSelf="center"
                            bg="gray.500"
                            size="2xl"
                            borderWidth={5}
                            borderColor="primary.700"
                            source={{
                                uri: imageProfile ? `data:image/gif;base64,${imageProfile}`
                                    : "https://avatars.githubusercontent.com/u/46757393?v=4"
                            }}
                        />

                        <Box ml={20} mt={2}>
                            <Circle
                                h={8}
                                w={8}
                                bottom={2}
                                alignSelf="center"
                                bg="primary.700"
                                position="absolute"
                            >
                                <Camera size={20} color={colors.white} />
                            </Circle>
                        </Box>
                    </Pressable>

                    <HStack mt={6} justifyContent="space-between">
                        <Box flex={1}>
                            <Controller
                                control={control}
                                name="firstName"
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        mb={5}
                                        title="Nome"
                                        placeholder="Nome"
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
                                        placeholder="Sobrenome"
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
                                placeholder="E-mail"
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
                                placeholder="CPF"
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
                                placeholder="Telefone"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                errorMessage={errors.contactNumber?.message}
                            />
                        )}
                    />

                    {
                        user.type === "Fornecedor" &&
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { value, onChange } }) => (
                                <TextArea
                                    mb={5}
                                    title="Descrição"
                                    placeholder="Descrição"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.description?.message}
                                />
                            )}
                        />
                    }

                    {
                        user.type === "Fornecedor" &&
                        <Controller
                            control={control}
                            name="kmWorkRange"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    mb={5}
                                    title="Distância de Trabalho"
                                    placeholder="Distância de Trabalho"
                                    value={value.toString()}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                    errorMessage={errors.kmWorkRange?.message}
                                />
                            )}
                        />
                    }

                    {
                        user.type === "Fornecedor" &&
                        <Controller
                            control={control}
                            name="hourValue"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    title="Valor por Hora"
                                    placeholder="Valor por Hora"
                                    value={value.toString()}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                    errorMessage={errors.hourValue?.message}
                                />
                            )}
                        />
                    }
                    <HStack mt={5} mb={3} space={4}>
                        {
                            !isConsumer &&
                            <Button
                                flex={1}
                                title="Ver Perfil"
                                variant="info"
                                onPress={handleNavigateProvider}
                            />
                        }

                        <Button
                            flex={1}
                            title="Salvar"
                            variant="sucess"
                            isLoading={isLoading}
                            isLoadingText="Salvando"
                            onPress={handleSubmit((value) => mutate(value))}
                        />
                    </HStack>

                </VStack>

            </ScrollView>

        </VStack>
    );
}