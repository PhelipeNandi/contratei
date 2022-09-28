import { useEffect } from 'react';
import { VStack, ScrollView } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { registerAccountRequest } from '../../features/registerAccount';
import { Header } from '../../components/ui/Header';
import { Input } from '../../components/form/Input';
import { RadioButton } from '../../components/form/RadioButton';
import { Button } from '../../components/ui/Button';
import { normalizeCPF, normalizeContactNumberValue } from '../../utils/masks';

import { RegisterNewUser } from '../../types/authentication';

const registerNewUserForm: yup.SchemaOf<RegisterNewUser> = yup.object({
    type: yup.mixed().oneOf(['Consumidor', 'Fornecedor']).required("Tipo obrigatório"),
    firstName: yup.string().required("Nome obrigatório"),
    lastName: yup.string().required("Sobrenome obrigatório"),
    contactNumber: yup.string().required("Telefone obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos").required("Senha obrigatória")
})

export function RegisterAccount() {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm<RegisterNewUser>({
        resolver: yupResolver(registerNewUserForm),
        defaultValues: {
            type: "Consumidor"
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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                type: "Consumidor",
                firstName: "",
                lastName: "",
                contactNumber: "",
                cpf: "",
                email: "",
                password: ""
            })
        }
    }, [isSubmitSuccessful]);

    async function handleRegisterAccount(data: RegisterNewUser) {
        await registerAccountRequest(data)
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            });
    }

    return (
        <VStack flex={1} bg="primary.700">

            <Header title="Cadastrar-se" />

            <VStack flex={1} roundedTop={32} bg="background">

                <ScrollView flex={1} mt={10} mx={8} showsVerticalScrollIndicator={false}>

                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { value, onChange } }) => (
                            <RadioButton
                                name="type"
                                optionOne="Consumidor"
                                optionTwo="Fornecedor"
                                defaultValue="Consumidor"
                                value={value}
                                onChange={onChange}
                                errorMessage={errors.type?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={8}
                                errorMessage={errors.firstName?.message}
                                placeholder="Nome"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={3}
                                errorMessage={errors.lastName?.message}
                                placeholder="Sobrenome"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="contactNumber"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={3}
                                errorMessage={errors.contactNumber?.message}
                                placeholder="Telefone"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="cpf"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={3}
                                errorMessage={errors.cpf?.message}
                                placeholder="CPF"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={3}
                                errorMessage={errors.email?.message}
                                placeholder="E-mail"
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={3}
                                errorMessage={errors.password?.message}
                                placeholder="Senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Button
                        w="full"
                        mt={5}
                        title="Cadastrar"
                        variant="primary"
                        onPress={handleSubmit(handleRegisterAccount)}
                    />

                </ScrollView>
            </VStack>

        </VStack>
    );
}