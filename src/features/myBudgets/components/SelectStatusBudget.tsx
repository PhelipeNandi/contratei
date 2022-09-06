import { Select as NativeBaseSelect, ISelectProps } from 'native-base';

export function SelectStatusBudget({ ...rest }: ISelectProps) {
    return (
        <NativeBaseSelect
            h={14}
            borderWidth={0}
            shadow={1}
            bg="white"
            size="md"
            color="primary.700"
            rounded="lg"
            defaultValue="all"
            {...rest}
        >
            <NativeBaseSelect.Item label="Todos" value="all" />
            <NativeBaseSelect.Item label="Aberto" value="open" />
            <NativeBaseSelect.Item label="Em Andamento" value="inProgress" />
            <NativeBaseSelect.Item label="Finalizado" value="finish" />
            <NativeBaseSelect.Item label="Cancelado" value="canceled" />
        </NativeBaseSelect>
    );
}