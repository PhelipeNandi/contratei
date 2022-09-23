import { VStack, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/svg/logo_contratei.svg';
import { propsStack } from '../../routes/Navigators/Models';

import { Button } from '../../components/ui/Button';
import { Header } from '../../components/ui/Header';

export function SplashScreen() {
    const navigation = useNavigation<propsStack>();

    return (
        <VStack flex={1}>

            <Header
                title="Entrar ou Cadastrar"
            />

            <VStack flex={1} px={5} alignItems="center" justifyContent="center" bg="background">

                <Logo />

                <Heading mt={2} mb={10} color="primary.700" fontSize="title">
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
        </VStack>
    );
}