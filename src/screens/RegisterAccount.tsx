import { useEffect } from 'react';
import { VStack, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { registerAccountRequest } from '../services/User';
import { RegisterNewUser } from '../types/user';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { RadioButton } from '../components/RadioButton';
import { Button } from '../components/Button';
import { normalizeCPF, normalizeContactNumberValue } from '../utils/masks';

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
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<RegisterNewUser>({
        resolver: yupResolver(registerNewUserForm)
    });

    const contactNumberValue = watch('contactNumber');
    const cpfValue = watch('cpf');

    useEffect(() => {
        setValue('contactNumber', normalizeContactNumberValue(contactNumberValue))
    }, [contactNumberValue]);

    useEffect(() => {
        setValue('cpf', normalizeCPF(cpfValue))
    }, [cpfValue]);

    async function handleRegisterAccount(data: RegisterNewUser) {
        const response = await registerAccountRequest(data);

        if (response.status === 200) {
            navigation.goBack();
        } else {
            //TODO
        }
    }

    return (
        <VStack flex={1} bg="primary.700">

            <Header title="Cadastrar-se" />

            <VStack flex={1} roundedTop={32} bg="background">

                <ScrollView flex={1} mt={10} mx={8}>

                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { value, onChange } }) => (
                            <RadioButton
                                mb={4}
                                name="type"
                                defaultValue="Consumidor"
                                optionOne="Consumidor"
                                optionTwo="Fornecedor"
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
                                mt={3}
                                mb={2}
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
                                mb={2}
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
                                mb={2}
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
                                mb={2}
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
                                mb={2}
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
                                mb={2}
                                errorMessage={errors.password?.message}
                                placeholder="Senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Button mt={5} title="Cadastrar" w="full" onPress={handleSubmit(handleRegisterAccount)} />

                </ScrollView>
            </VStack>

        </VStack>
    );
}