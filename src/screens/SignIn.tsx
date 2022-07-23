import { useState, useContext } from 'react';
import { VStack, Icon, Divider, useTheme } from 'native-base';
import { Envelope, Key, GoogleLogo } from 'phosphor-react-native';
import { AuthContext } from '../contexts/auth';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    const { signIn } = useContext(AuthContext);

    async function handleSignIn(data) {
        await signIn(data);
    }

    return (
        <VStack flex={1} bg="background">

            <Header title="Entrar" />

            <VStack justifyContent="center" px={8} mt={32}>
                <Input
                    mb={3}
                    placeholder='E-mail'
                    InputLeftElement={<Icon as={<Envelope color={colors.gray[100]} />} ml={4} />}
                    onChangeText={setEmail}
                />

                <Input
                    mb={3}
                    placeholder='Senha'
                    InputLeftElement={<Icon as={<Key color={colors.gray[100]} />} ml={4} />}
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <Button title="Entrar" w="full" onPress={() => handleSignIn({ email, password })} />

                <Divider my="5" thickness="2" bg="gray.500" />

                <Button
                    leftIcon={<Icon as={<GoogleLogo color={colors.gray[500]} />} />}
                    title="Entrar com Google"
                    w="full"
                />
            </VStack>
        </VStack>
    );
}