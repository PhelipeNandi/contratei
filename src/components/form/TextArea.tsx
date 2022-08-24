import { TextArea as NativeBaseTextArea, VStack, ITextAreaProps, Text } from 'native-base';

type Props = ITextAreaProps & {
    errorMessage?: string;
}

export function TextArea({ errorMessage, ...rest }: Props) {
    return (
        <VStack>
            <NativeBaseTextArea
                bg="white"
                h={48}
                autoCompleteType="off"
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
                <Text textAlign="right" fontSize="sm" color="red.600" mt={2}>
                    {errorMessage}
                </Text>
            }
        </VStack>
    );
}