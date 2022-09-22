import { VStack, HStack, Box, IconButton, Text, AspectRatio, Image, Avatar } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { propsNavigationStack, propsStack } from '../../routes/Navigators/Models';

import { PerfilProvider } from '../../features/searchProvider';

export function Provider() {
    const route = useRoute<RouteProp<propsNavigationStack, "provider">>();
    const navigation = useNavigation<propsStack>();

    return (
        <VStack flex={1} bg="background">
            <PerfilProvider />

            <VStack px={8}>
                <Text mt={3} textAlign="center" fontFamily="body" fontSize="lg" color="primary.700">
                    Fornecedor 1
                </Text>

                <Text mt={3} px={10} textAlign="center" fontFamily="body" fontSize="xs" color="gray.300">
                    Essa aqui é minha descrição como fornecedor
                </Text>
            </VStack>
        </VStack >
    );
}