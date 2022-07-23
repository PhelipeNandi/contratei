import { VStack, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_contratei.svg';

import { Button } from '../components/Button';

export function SplashScreen() {
    const navigation = useNavigation();

    return (
        <VStack flex={1} alignItems="center" bg="background" px={5} pt={40}>

            <Logo />

            <Heading color={'primary.700'} fontSize="title" mt={2} mb={10}>
                Contratei
            </Heading>

            <Button
                w="full"
                title="Entrar"
                onPress={() => navigation.navigate('signIn')}
            />

            <Button
                w="full"
                mt={5}
                title="Cadastrar"
                onPress={() => navigation.navigate('registerAccount')}
            />

        </VStack>
    );
}