import { VStack, Avatar, Pressable, IPressableProps, Circle, Box, useTheme } from 'native-base';
import { Camera } from 'phosphor-react-native';

type Props = IPressableProps & {
    imageProfile?: string;
}

export function PhotoCosumer({ imageProfile, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <VStack>
            <Avatar
                mt={8}
                alignSelf="center"
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
                        bottom={2}
                        alignSelf="center"
                        bg="primary.700"
                        position="absolute"
                    >
                        <Camera size={20} color={colors.white} />
                    </Circle>
                </Box>
            </Pressable>
        </VStack>
    );
}