import { useEffect } from 'react';
import { VStack, ScrollView, Text } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';

import { CreateNewBudget } from '../../types/budget';
import { useAuthContext } from '../../hooks/useAuthContext';
import { propsTab } from '../../routes/Navigators/Models';

import { Header } from '../../components/ui/Header';
import { Input } from '../../components/form/Input';
import { TextArea } from '../../components/form/TextArea';
import { Button } from '../../components/ui/Button';
import { RadioButtonPriorityLevel, SelectServiceType, createNewBudgetRequest } from '../../features/createBudget';

const createNewBudgetForm: yup.SchemaOf<CreateNewBudget> = yup.object({
    title: yup.string().required("Título obrigatório"),
    priorityLevel: yup.string().required("Nível de Prioridade obrigatório"),
    serviceType: yup.string().required("Tipo de Serviço obrigatório"),
    description: yup.string().required("Tipo de Serviço obrigatório")
})

export function CreateBudget() {
    const { user } = useAuthContext();
    const { navigate } = useNavigation<propsTab>();
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm<CreateNewBudget>({
        resolver: yupResolver(createNewBudgetForm),
        defaultValues: {
            priorityLevel: "COMBINE"
        }
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                title: "",
                description: "",
                priorityLevel: "COMBINE",
                serviceType: ""
            });
        }
    }, [isSubmitSuccessful])

    const {
        mutate,
        isLoading
    } = useMutation((data: CreateNewBudget) => createNewBudgetRequest(data, user), {
        onSuccess: () => {
            queryClient.invalidateQueries("myBudgets");
            navigate("myBudgetsTab");
        }
    });

    return (
        <VStack flex={1}>
            <Header title="Criar Orçamento" />

            <ScrollView>

                <VStack flex={1} px={8} bg="background">

                    <Controller
                        control={control}
                        name="serviceType"
                        render={({ field: { value, onChange } }) => (
                            <SelectServiceType
                                mt={5}
                                selectedValue={value}
                                onValueChange={onChange}
                                errorMessage={errors.serviceType?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={5}
                                placeholder="Titulo"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.title?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { value, onChange } }) => (
                            <TextArea
                                mt={5}
                                placeholder="Descrição"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.description?.message}
                            />
                        )}
                    />

                    <Text
                        mt={5}
                        fontFamily="body"
                        fontSize="md"
                        color="primary.700"
                    >
                        Nível de prioridade
                    </Text>

                    <Controller
                        control={control}
                        name="priorityLevel"
                        render={({ field: { value, onChange } }) => (
                            <RadioButtonPriorityLevel
                                mt={4}
                                name="priority"
                                defaultValue="COMBINE"
                                value={value}
                                onChange={onChange}
                                errorMessage={errors.priorityLevel?.message}
                            />
                        )}
                    />

                    <Button
                        mt={2}
                        mb={8}
                        title="Salvar"
                        variant="PRIMARIO"
                        isLoading={isLoading}
                        isLoadingText="Salvando"
                        onPress={handleSubmit((values) => mutate(values))}
                    />

                </VStack>
            </ScrollView>
        </VStack >
    );
}