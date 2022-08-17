import { Input as NativeBaseInput, IInputProps, VStack, Text } from 'native-base';

type Props = IInputProps & {
    errorMessage?: string;
}

export function Input({ errorMessage, ...rest }: Props) {
    return (
        <VStack>
            <NativeBaseInput
                bg="white"
                h={14}
                size="md"
                borderWidth={0}
                fontSize="md"
                fontFamily="body"
                color="secondary.700"
                placeholderTextColor="secondary.700"
                shadow={1}
                rounded="lg"
                _focus={{
                    borderWidth: 1,
                    borderColor: errorMessage != null ? "error" : "primary.700",
                    bg: "white"
                }}
                {...rest}
            />

            {
                !!errorMessage &&
                <Text textAlign="right" fontSize="sm" color="red.600" mb={2}>
                    {errorMessage}
                </Text>
            }
        </VStack>
    );
}