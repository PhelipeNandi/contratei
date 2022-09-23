import { HStack, IconButton, Heading, StyledProps, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, DotsThreeVertical, Bell, SignIn } from 'phosphor-react-native';

import { propsStack } from '../../routes/Navigators/Models';
import { useAuthContext } from '../../hooks/useAuthContext';

type Props = StyledProps & {
    title?: string;
}

export function Header({ title, ...rest }: Props) {
    const navigation = useNavigation<propsStack>();
    const { isAuthenticated } = useAuthContext();

    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            bg="primary.700"
            pt={12}
            pb={6}
            {...rest}
        >

            {
                !isAuthenticated && !title &&
                <HStack
                    flex={1}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text pl={5} fontFamily="body" fontSize="title" color="white">
                        Contratei
                    </Text>

                    <IconButton
                        pr={4}
                        icon={<SignIn color="white" size={30} />}
                        onPress={() => navigation.navigate('splashScreen')}
                    />
                </HStack>
            }

            {
                !!title &&
                <HStack
                    pl={3}
                    alignItems="center"
                >

                    <IconButton
                        icon={<ArrowLeft color="white" size={24} />}
                        onPress={() => navigation.goBack()}
                    />

                    <Heading
                        pl={5}
                        color="white"
                        textAlign="center"
                        fontSize="lg"
                    >
                        {title}
                    </Heading>
                </HStack>
            }

            {
                isAuthenticated &&
                <HStack
                    pl={3}
                    alignItems="center"
                >
                    <IconButton
                        icon={<Bell color="white" size={24} />}
                        onPress={() => navigation.navigate('notifications')}
                    />

                    <IconButton
                        icon={<DotsThreeVertical color="white" size={24} />}
                        onPress={() => navigation.navigate('settings')}
                    />
                </HStack>
            }

        </HStack>
    );
}