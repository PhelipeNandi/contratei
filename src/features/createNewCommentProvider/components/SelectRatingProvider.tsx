import { Select as NativeBaseSelect, ISelectProps, FormControl, WarningOutlineIcon } from 'native-base';

type Props = ISelectProps & {
    errorMessage?: string;
}

export function SelectRatingProvider({ errorMessage, ...rest }: Props) {
    return (
        <FormControl isInvalid={!!errorMessage}>
            <NativeBaseSelect
                h={14}
                borderWidth={0}
                shadow={1}
                bg="white"
                size="md"
                color="primary.700"
                rounded="lg"
                defaultValue="3"
                {...rest}
            >
                <NativeBaseSelect.Item label="Muito Ruim" value="1" />
                <NativeBaseSelect.Item label="Ruim" value="2" />
                <NativeBaseSelect.Item label="Médio" value="3" />
                <NativeBaseSelect.Item label="Bom" value="4" />
                <NativeBaseSelect.Item label="Muito Bom" value="5" />
            </NativeBaseSelect>

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}