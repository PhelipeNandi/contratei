import { Input as NativeBaseInput, IInputProps, FormControl, WarningOutlineIcon, Text } from 'native-base';

type Props = IInputProps & {
    title?: string;
    errorMessage?: string;
}

export function Input({ title, errorMessage, ...rest }: Props) {
    return (
        <FormControl isInvalid={!!errorMessage}>
            {
                title &&
                <FormControl.Label>
                    <Text fontFamily="body" fontSize="xs" color="gray.300">
                        {title}
                    </Text>
                </FormControl.Label>
            }
            <NativeBaseInput
                bg="white"
                h={14}
                size="md"
                borderWidth={0}
                fontSize="md"
                fontFamily="body"
                color="secondary.700"
                placeholderTextColor="gray.300"
                shadow={1}
                rounded="lg"
                _focus={{
                    borderWidth: 1,
                    borderColor: !!errorMessage ? "error" : "primary.700",
                    bg: "white"
                }}
                {...rest}
            />

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}