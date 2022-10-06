import { Select as NativeBaseSelect, ISelectProps } from 'native-base';

export function SelectActingRegion({ ...rest }: ISelectProps) {
    return (
        <NativeBaseSelect
            h={14}
            borderWidth={0}
            shadow={1}
            bg="white"
            size="md"
            color="primary.700"
            rounded="lg"
            defaultValue="CITY"
            {...rest}
        >
            <NativeBaseSelect.Item label="Bairro" value="DISTRICT" />
            <NativeBaseSelect.Item label="Cidade" value="CITY" />
            <NativeBaseSelect.Item label="Estado" value="STATE" />
            <NativeBaseSelect.Item label="País" value="COUNTRY" />
        </NativeBaseSelect>
    );
}