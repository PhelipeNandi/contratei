
import { VStack, Box, AspectRatio, Image, IconButton, Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, PencilSimple } from 'phosphor-react-native';

import { propsStack } from '../../../routes/Navigators/Models';
import { useAuthContext } from '../../../hooks/useAuthContext';

export function PerfilProvider() {
    const navigation = useNavigation<propsStack>();
    const { isAuthenticated, isConsumer } = useAuthContext();

    return (
        <VStack>
            <Box
                mt={12}
                px={2}
                maxW={96}
                alignSelf="center"
            >
                <AspectRatio w="100%" ratio={16 / 10}>
                    <Image
                        alt="image"
                        borderRadius={20}
                        source={{ uri: "https://static.wikia.nocookie.net/ipod/images/d/dc/Apple_Changsha_R617-2022-09.jpg/revision/latest?cb=20220528150453" }}
                    />
                </AspectRatio>
            </Box>

            <Box position="absolute" left={5} top={12} maxW={12} rounded="lg" borderColor="primary.700">
                <IconButton
                    icon={<ArrowLeft color="white" size={24} />}
                    onPress={() => navigation.goBack()}
                />
            </Box>

            {
                isAuthenticated && !isConsumer &&
                <Box position="absolute" right={5} bottom={3} maxW={12} rounded="lg" borderColor="primary.700">
                    <IconButton
                        icon={<PencilSimple color="white" size={24} />}
                        onPress={() => navigation.navigate("personalInformation")}
                    />
                </Box>
            }
            <Box
                pt={1}
                top={24}
                alignSelf="center"
                position="absolute"
            >
                <Avatar
                    borderWidth={5}
                    borderColor="white"
                    bg="gray.500"
                    size="2xl"
                    source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }}
                />
            </Box>
        </VStack>
    );
}