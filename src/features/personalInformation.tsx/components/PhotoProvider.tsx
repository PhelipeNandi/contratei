import { ReactNode } from 'react';
import { Camera } from 'phosphor-react-native';
import { VStack, Box, AspectRatio, Image, Avatar, Pressable, IPressableProps, Circle, useTheme } from 'native-base';

type Props = IPressableProps & {
    backgroundImage: string;
    imageProfile: string;
    children?: ReactNode;
}

export function PhotoProvider({ backgroundImage, imageProfile, children, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <VStack>
            <Box
                mt={5}
                px={2}
                maxW={96}
                alignSelf="center"
            >
                <AspectRatio w="100%" ratio={16 / 10}>
                    <Image
                        alt="image"
                        borderRadius={20}
                        source={{
                            uri: backgroundImage ? `data:image/gif;base64,${backgroundImage}`
                                : "https://static.wikia.nocookie.net/ipod/images/d/dc/Apple_Changsha_R617-2022-09.jpg/revision/latest?cb=20220528150453"
                        }}
                    />
                </AspectRatio>
            </Box>

            <Avatar
                pt={1}
                top={16}
                alignSelf="center"
                position="absolute"
                bg="gray.500"
                size="2xl"
                borderWidth={5}
                borderColor="primary.700"
                source={{
                    uri: imageProfile ? `data:image/gif;base64,${imageProfile}`
                        : "https://avatars.githubusercontent.com/u/46757393?v=4"
                }}
            />

            <Pressable {...rest}>
                <Box ml={20} mt={2}>
                    <Circle
                        h={8}
                        w={8}
                        bottom={12}
                        alignSelf="center"
                        bg="primary.700"
                        position="absolute"
                    >
                        <Camera size={20} color={colors.white} />
                    </Circle>
                </Box>
            </Pressable>

            <Box position="absolute" right={5} bottom={3} maxW={12} rounded="lg" borderColor="primary.700">
                {children}
            </Box>
        </VStack>
    );
}