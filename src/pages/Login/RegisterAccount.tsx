import { useEffect, useState } from 'react';
import { VStack, ScrollView } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { RegisterNewUser } from '../../types/authentication';
import { maskCPF, maskContactNumberValue } from '../../utils/masks';

import { Header } from '../../components/ui/Header';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/ui/Button';
import { RadioButton } from '../../components/form/RadioButton';
import { SelectServiceType } from '../../features/createBudget';
import { registerAccountRequest } from '../../features/registerAccount';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/Navigators/Models';
import { useAuthContext } from '../../hooks/useAuthContext';

const registerNewUserForm: yup.SchemaOf<RegisterNewUser> = yup.object({
    type: yup.mixed().oneOf(['Consumidor', 'Fornecedor']).required("Tipo obrigatório"),
    firstName: yup.string().required("Nome obrigatório"),
    lastName: yup.string().required("Sobrenome obrigatório"),
    contactNumber: yup.string().required("Telefone obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    serviceType: yup.string().nullable(),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos").required("Senha obrigatória")
})

export function RegisterAccount() {
    const navigation = useNavigation<propsStack>();
    const { googleUser, signIn } = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isProvider, setIsProvider] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        getValues,
        formState: { errors, isSubmitSuccessful }
    } = useForm<RegisterNewUser>({
        resolver: yupResolver(registerNewUserForm),
        defaultValues: {
            type: "Consumidor",
            serviceType: "EMPREGADO"
        }
    });

    useEffect(() => {
        if (googleUser != null) {
            setValue("firstName", googleUser.firstName);
            setValue("lastName", googleUser.lastName);
            setValue("email", googleUser.email);
            setValue("password", googleUser.password);
        }
    }, []);

    const typeValue = watch('type');

    useEffect(() => {
        typeValue === "Fornecedor" ? setIsProvider(true) : setIsProvider(false);
    }, [typeValue]);

    const contactNumberValue = watch('contactNumber');
    const cpfValue = watch('cpf');

    useEffect(() => {
        setValue('contactNumber', maskContactNumberValue(contactNumberValue))
    }, [contactNumberValue]);

    useEffect(() => {
        setValue('cpf', maskCPF(cpfValue))
    }, [cpfValue]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                type: "Consumidor",
                serviceType: "EMPREGADO",
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
        setIsLoading(true);
        await registerAccountRequest(data)
            .then(() => {
                setIsLoading(false);

                if (googleUser != null) {
                    signIn({ email: googleUser.email, password: googleUser.password });
                } else {
                    navigation.goBack();
                }
            })
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

                <ScrollView mt={10} px={8} showsVerticalScrollIndicator={false}>

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

                    {
                        isProvider
                        && <Controller
                            control={control}
                            name="serviceType"
                            render={({ field: { value, onChange } }) => (
                                <SelectServiceType
                                    mt={3}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                />
                            )}
                        />
                    }

                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={isProvider ? 3 : 8}
                                errorMessage={errors.firstName?.message}
                                placeholder="Nome"
                                value={value}
                                onChangeText={onChange}
                                isDisabled={googleUser != null}
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
                                isDisabled={googleUser != null}
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
                                isDisabled={googleUser != null}
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
                                isDisabled={googleUser != null}
                            />
                        )}
                    />

                    <Button
                        w="full"
                        mt={5}
                        title="Cadastrar"
                        variant="sucess"
                        isLoading={isLoading}
                        isLoadingText="Cadastrando"
                        onPress={handleSubmit(handleRegisterAccount)}
                    />

                </ScrollView>
            </VStack>

        </VStack>
    );
}