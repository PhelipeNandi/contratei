import { VStack, Icon, Divider, useTheme, HStack } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Envelope, Key, GoogleLogo } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import Login from '../../assets/svg/login.svg';
import { SignInData } from '../../types/authentication';
import { useAuthContext } from '../../hooks/useAuthContext';
import { propsStack } from '../../routes/Navigators/Models';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/form/Input';

const signInForm: yup.SchemaOf<SignInData> = yup.object({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos").required("Senha obrigatória")
})

export function SignIn() {
    const { colors } = useTheme();
    const { signIn, signInGoogle } = useAuthContext();
    const navigation = useNavigation<propsStack>();

    const { control, handleSubmit, formState: { errors } } = useForm<SignInData>({
        resolver: yupResolver(signInForm)
    });

    async function handleSignIn(data: SignInData) {
        await signIn(data)
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            });
    }

    async function handleSignInGoogle() {
        await signInGoogle()
            .then((response) => {
                if (response != undefined && response === "Usuário não encontrado") {
                    navigation.navigate("registerAccount");
                }
            })
    }

    return (
        <VStack flex={1} bg="primary.700">

            <Header title="Entrar" />

            <VStack flex={1} px={8} roundedTop={32} bg="background">

                <VStack mt={10} alignItems="center" justifyContent="center">
                    <Login />
                </VStack>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { value, onChange } }) => (
                        <Input
                            errorMessage={errors.email?.message}
                            placeholder="E-mail"
                            autoCapitalize="none"
                            InputLeftElement={<Icon as={<Envelope color={colors.secondary[700]} />} ml={4} />}
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
                            mt={4}
                            errorMessage={errors.password?.message}
                            placeholder="Senha"
                            InputLeftElement={<Icon as={<Key color={colors.secondary[700]} />} ml={4} />}
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <Button
                    mt={5}
                    w="full"
                    title="Entrar"
                    variant="primary"
                    onPress={handleSubmit(handleSignIn)}
                />

                <Divider my="5" thickness="2" bg="secondary.700" />

                <Button
                    w="full"
                    variant="primary"
                    title="Entrar com Google"
                    onPress={handleSignInGoogle}
                    leftIcon={<Icon as={<GoogleLogo color={colors.white} />} />}
                />
            </VStack>
        </VStack >
    );
}