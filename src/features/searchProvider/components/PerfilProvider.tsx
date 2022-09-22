
import { VStack, Box, AspectRatio, Image, IconButton, Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'phosphor-react-native';

import { propsStack } from '../../../routes/Navigators/Models';

export function PerfilProvider() {
    const navigation = useNavigation<propsStack>();

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
                        source={{ uri: "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" }}
                    />
                </AspectRatio>
            </Box>

            <Box position="absolute" left={5} top={12} maxW={12} rounded="lg" borderColor="primary.700">
                <IconButton
                    icon={<ArrowLeft color="white" size={24} />}
                    onPress={() => navigation.goBack()}
                />
            </Box>

            <Box
                pt={1}
                top={24}
                alignSelf="center"
                position="absolute"
            >
                <Avatar borderWidth={5} borderColor="white" bg="gray.500" size="2xl" source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }} />
            </Box>
        </VStack>
    );
}