import { Box, IBoxProps, AspectRatio, Image, Pressable, IPressableProps } from 'native-base';

import { Photo } from '../../../types/provider';

type Props = IPressableProps & {
    photos: Photo
}

export function PhotosProvider({ photos, ...rest }: Props) {
    return (
        <Pressable {...rest}>
            <Box
                mx={5}
                maxW={80}
            >
                <AspectRatio w="100%" ratio={16 / 10}>
                    <Image
                        alt="image"
                        borderRadius={20}
                        source={{ uri: `data:image/gif;base64,${photos.url}` }}
                    />
                </AspectRatio>
            </Box>
        </Pressable>
    );
}