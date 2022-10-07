import { Box, IBoxProps, AspectRatio, Image } from 'native-base';

import { Photo } from '../../../types/provider';

type Props = IBoxProps & {
    photos: Photo
}

export function PhotosProvider({ photos, ...rest }: Props) {
    return (
        <Box
            mx={5}
            maxW={80}
            {...rest}
        >
            <AspectRatio w="100%" ratio={16 / 10}>
                <Image
                    alt="image"
                    borderRadius={20}
                    source={{ uri: `data:image/gif;base64,${photos.url}` }}
                />
            </AspectRatio>
        </Box>
    );
}