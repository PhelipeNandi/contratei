import { VStack, Select as NativeBaseSelect, ISelectProps, Text } from 'native-base';

type Props = ISelectProps & {
    errorMessage?: string;
}

export function SelectServiceType({ errorMessage, ...rest }: Props) {
    return (
        <VStack>
            <NativeBaseSelect
                bg="white"
                h={14}
                size="md"
                borderWidth={0}
                color="secondary.700"
                placeholderTextColor="secondary.700"
                shadow={1}
                rounded="lg"
                placeholder="Escolha um tipo de serviço"
                {...rest}
            >
                <NativeBaseSelect.Item label="Empregado" value="EMPREGADO" />
                <NativeBaseSelect.Item label="Marceneiro" value="MARCENEIRO" />
                <NativeBaseSelect.Item label="Pintor" value="PINTOR" />
                <NativeBaseSelect.Item label="Pedreiro" value="PEDREIRO" />
                <NativeBaseSelect.Item label="Mecanico" value="MECANICO" />
            </NativeBaseSelect>

            {
                !!errorMessage &&
                <Text textAlign="right" fontSize="sm" color="red.600" mt={2}>
                    {errorMessage}
                </Text>
            }
        </VStack>
    );
}