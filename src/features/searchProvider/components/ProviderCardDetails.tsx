import React from 'react';
import { Box, Pressable, IPressableProps, AspectRatio, Image, Stack, Heading, Text, Center, Divider, HStack } from 'native-base';
import { Smiley } from 'phosphor-react-native';

import { Provider } from '../../../types/provider';

type Props = IPressableProps & {
  data: Provider;
  maxW: number;
}

export function ProviderCardDetails({ data, maxW, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <Box
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
              source={{ uri: "https://images.unsplash.com/photo-1622613371413-5c0da41cbc4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80" }}
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

            <HStack justifyContent="center" space={1}>
              <Text fontFamily="body" fontSize="xs">
                R$ {data.hourValue}
              </Text>

              <Text fontFamily="body" fontSize="xs">
                -
              </Text>

              <Smiley size={18} />

              <Text fontFamily="body" fontSize="xs">
                9.2
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
}