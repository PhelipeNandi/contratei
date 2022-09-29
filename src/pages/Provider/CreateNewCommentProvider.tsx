import { useNavigation } from '@react-navigation/native';
import { VStack, HStack, Box, Text, IconButton, Collapse } from 'native-base';
import { ArrowLeft } from 'phosphor-react-native';
import { propsStack } from '../../routes/Navigators/Models';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { createNewCommentProviderRequest, SelectRatingProvider } from '../../features/createNewCommentProvider';
import { Alert } from '../../components/form/Alert';
import { TextArea } from '../../components/form/TextArea';
import { Button } from '../../components/ui/Button';
import { NewCommentProvider } from '../../types/provider';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProviderContext } from '../../hooks/useProviderContext';
import { useState } from 'react';

const createNewCommentProviderForm: yup.SchemaOf<NewCommentProvider> = yup.object({
    rating: yup.string().required("Nota obrigatória"),
    description: yup.string().required("Comentário obrigatório"),
});

export function CreateNewCommentProvider() {
    const navigation = useNavigation<propsStack>();
    const { user } = useAuthContext();
    const { provider } = useProviderContext();
    const queryClient = useQueryClient();
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful }
    } = useForm<NewCommentProvider>({
        resolver: yupResolver(createNewCommentProviderForm),
        defaultValues: {
            rating: "3"
        }
    });

    const {
        isError,
        isLoading,
        mutate
    } = useMutation((data: NewCommentProvider) => createNewCommentProviderRequest(data, user.id, provider.id), {
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
            queryClient.invalidateQueries("commentProvider");
            navigation.goBack();
        },
        onError: () => {
            setShowAlert(true);
        }
    });

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
                    Criar novo {""}
                </Text>
                <Text textAlign="center" fontFamily="body" fontSize="lg" color="primary.700">
                    Comentário
                </Text>
            </HStack>

            {
                isError &&
                <Collapse mt={8} isOpen={showAlert}>
                    <Alert
                        status="error"
                        header="Ocorreu um erro ao cadastrar seu comentário!"
                        onPress={() => setShowAlert(false)}
                    />
                </Collapse>
            }

            <VStack mt={showAlert ? 4 : 16} mx={5}>

                <Controller
                    control={control}
                    name="rating"
                    render={({ field: { value, onChange } }) => (
                        <SelectRatingProvider
                            shadow={5}
                            selectedValue={value}
                            onValueChange={onChange}
                            errorMessage={errors.rating?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({ field: { value, onChange } }) => (
                        <TextArea
                            h={80}
                            mt={5}
                            shadow={5}
                            placeholder="Comentário"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.description?.message}
                        />
                    )}
                />

                <Button
                    mt={5}
                    title="Salvar"
                    variant="sucess"
                    isLoading={isLoading}
                    isLoadingText="Salvando"
                    onPress={handleSubmit((value) => mutate(value))}
                />

            </VStack>

        </VStack >
    );
}