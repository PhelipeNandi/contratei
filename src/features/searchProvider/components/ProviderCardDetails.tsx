import React from 'react';
import { Box, Pressable, IPressableProps, AspectRatio, Image, Stack, Heading, Text, Center, Divider, HStack } from 'native-base';
import { Smiley } from 'phosphor-react-native';

import { Provider } from '../../../types/provider';
import { RatingProvider } from '../../commentsProvider';

type Props = IPressableProps & {
  data: Provider;
  maxW: number;
}

export function ProviderCardDetails({ data, maxW, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <Box
        flex={1}
        mx={5}
        maxW={maxW}
        bg="white"
        rounded="lg"
        borderWidth="1"
        shadow={5}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 10}>
            <Image
              alt="image"
              source={{
                uri: data.backgroundImage != undefined ? `data:image/gif;base64,${data.backgroundImage}`
                  : "https://images.unsplash.com/photo-1622613371413-5c0da41cbc4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              }}
            />
          </AspectRatio>
          <Center bg="primary.700">
            <Text fontFamily="body" fontSize="xs" color="white">
              {data.serviceType}
            </Text>
          </Center>
          <Stack p={4} space={3}>
            <Heading fontFamily="body" size="sm">
              {data.firstName} {data.lastName}
            </Heading>

            <Text fontFamily="body" fontSize="xs">
              {data.description}
            </Text>

            <Divider />

            <HStack alignItems="center" justifyContent="center" space={1}>
              <Text fontFamily="body" fontSize="md">
                R$ {data.hourValue}
              </Text>

              {
                data.rating && <Text fontFamily="body" fontSize="md">
                  -
                </Text>
              }

              {
                data.rating && <RatingProvider data={data.rating} />
              }

            </HStack>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
}