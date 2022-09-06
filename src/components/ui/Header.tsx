import { HStack, IconButton, Heading, StyledProps } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, DotsThreeVertical, Bell } from 'phosphor-react-native';

import { useAuthContext } from '../../hooks/useAuthContext';

type Props = StyledProps & {
    title: string;
}

export function Header({ title, ...rest }: Props) {
    const navigation = useNavigation();
    const { isAuthenticated } = useAuthContext();

    function handleGoBack() {
        navigation.goBack();
    }

    function handleNavigateNotifications() {
        navigation.navigate('notifications');
    }

    function handleNavigateSettigns() {
        navigation.navigate('settings');
    }

    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            bg="primary.700"
            pt={12}
            pb={6}
            {...rest}
        >
            <HStack
                pl={3}
                alignItems="center"
            >
                <IconButton
                    icon={<ArrowLeft color="white" size={24} />}
                    onPress={handleGoBack}
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

            {
                isAuthenticated &&
                <HStack
                    pl={3}
                    alignItems="center"
                >
                    <IconButton
                        onPress={handleNavigateNotifications}
                        icon={<Bell color="white" size={24} />}
                    />

                    <IconButton
                        onPress={handleNavigateSettigns}
                        icon={<DotsThreeVertical color="white" size={24} />}
                    />
                </HStack>
            }

        </HStack>
    );
}