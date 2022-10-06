import { Select as NativeBaseSelect, ISelectProps, FormControl, WarningOutlineIcon } from 'native-base';

type Props = ISelectProps & {
    title?: string;
    errorMessage?: string;
}

export function SelectActingRegion({ title, errorMessage, ...rest }: Props) {
    return (
        <FormControl>
            {
                title &&
                <FormControl.Label>{title}</FormControl.Label>
            }
            <NativeBaseSelect
                h={14}
                borderWidth={0}
                shadow={1}
                bg="white"
                size="md"
                color="primary.700"
                rounded="lg"
                placeholder="Selecione uma região de atuação"
                {...rest}
            >
                <NativeBaseSelect.Item label="Bairro" value="DISTRICT" />
                <NativeBaseSelect.Item label="Cidade" value="CITY" />
                <NativeBaseSelect.Item label="Estado" value="STATE" />
                <NativeBaseSelect.Item label="País" value="COUNTRY" />
            </NativeBaseSelect>

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}