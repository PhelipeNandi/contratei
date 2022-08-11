import { VStack, Icon, Divider, useTheme } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Envelope, Key, GoogleLogo } from 'phosphor-react-native';

import { useAuth } from '../contexts/auth';
import { SignInData } from '../types/user';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const signInForm: yup.SchemaOf<SignInData> = yup.object({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos").required("Senha obrigatória")
})

export function SignIn() {
    const { colors } = useTheme();
    const { signIn, signInGoogle } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<SignInData>({
        resolver: yupResolver(signInForm)
    });

    async function handleSignIn(data: SignInData) {
        await signIn(data);
    }

    async function handleSignInGoogle() {
        await signInGoogle();
    }

    return (
        <VStack flex={1} bg="background">

            <Header title="Entrar" />

            <VStack justifyContent="center" px={8} mt={32}>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { value, onChange } }) => (
                        <Input
                            mb={2}
                            errorMessage={errors.email?.message}
                            placeholder="E-mail"
                            autoCapitalize="none"
                            InputLeftElement={<Icon as={<Envelope color={colors.gray[100]} />} ml={4} />}
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
                            InputLeftElement={<Icon as={<Key color={colors.gray[100]} />} ml={4} />}
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <Button
                    mt={5}
                    title="Entrar"
                    w="full"
                    onPress={handleSubmit(handleSignIn)}
                />

                <Divider my="5" thickness="2" bg="gray.500" />

                <Button
                    leftIcon={<Icon as={<GoogleLogo color={colors.gray[500]} />} />}
                    title="Entrar com Google"
                    w="full"
                    onPress={handleSignInGoogle}
                />
            </VStack>
        </VStack>
    );
}