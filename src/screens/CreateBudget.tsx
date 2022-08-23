import { VStack, ScrollView, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { Header } from '../components/Header';
import { SelectServiceType } from '../components/SelectServiceType';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';
import { RadioButtonPriorityLevel } from '../components/RadioButtonPriorityLevel';
import { Button } from '../components/Button';

import { CreateNewBudget } from '../types/budget';

const createNewBudgetForm: yup.SchemaOf<CreateNewBudget> = yup.object({
    title: yup.string().required("Título obrigatório"),
    priorityLevel: yup.string().required("Nível de Prioridade obrigatório"),
    type: yup.string().required("Tipo de Serviço obrigatório"),
    description: yup.string().required("Tipo de Serviço obrigatório")
})

export function CreateBudget() {
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateNewBudget>({
        resolver: yupResolver(createNewBudgetForm)
    });

    function handleCreateNewBudget(data: CreateNewBudget) {
        console.log(data);
        navigation.navigate('myBudgets');
    }

    return (
        <VStack flex={1}>
            <Header title="Criar Orçamento" />

            <ScrollView>

                <VStack flex={1} px={8} bg="background">

                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { value, onChange } }) => (
                            <SelectServiceType
                                mt={5}
                                selectedValue={value}
                                onValueChange={onChange}
                                errorMessage={errors.type?.message}
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
                                mt={5}
                                name="priority"
                                value={value}
                                onChange={onChange}
                                errorMessage={errors.priorityLevel?.message}
                            />
                        )}
                    />

                    <Button
                        my={10}
                        title="Salvar"
                        onPress={handleSubmit(handleCreateNewBudget)}
                    />

                </VStack>
            </ScrollView>
        </VStack >
    );
}