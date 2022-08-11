import { Input as NativeBaseInput, IInputProps, VStack, Text } from 'native-base';

type Props = IInputProps & {
    errorMessage?: string;
}

export function Input({ errorMessage, ...rest }: Props) {
    return (
        <VStack>
            <NativeBaseInput
                bg="gray.500"
                h={14}
                size="md"
                borderWidth={0}
                fontSize="md"
                fontFamily="body"
                color="white"
                placeholderTextColor="white"
                _focus={{
                    borderWidth: 1,
                    borderColor: errorMessage != null ? "error" : "primary.700",
                    bg: "gray.400"
                }}
                {...rest}
            />

            {
                !!errorMessage &&
                <Text textAlign="right" fontSize="sm" color="error" mb={2}>
                    {errorMessage}
                </Text>
            }
        </VStack>
    );
}