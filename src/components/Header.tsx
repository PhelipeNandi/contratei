import { HStack, IconButton, Heading, StyledProps, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'phosphor-react-native';

type Props = StyledProps & {
    title: string;
}

export function Header({ title, ...rest }: Props) {
    const { colors } = useTheme();
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <HStack
            w="full"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            bg="primary.700"
            pb={12}
            pt={20}
            {...rest}
        >

            <HStack position="absolute" left={0} pt={8} px={8}>
                <IconButton
                    icon={<ArrowLeft color="white" size={24} />}
                    onPress={handleGoBack}
                />
            </HStack>

            <HStack>
                <Heading color="white" textAlign="center" fontSize="lg">
                    {title}
                </Heading>
            </HStack>

        </HStack>
    );
}