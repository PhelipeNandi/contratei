import { Select as NativeBaseSelect, ISelectProps } from 'native-base';

import { Status } from '../../../types/budget';

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
            defaultValue="ALL"
            {...rest}
        >
            <NativeBaseSelect.Item label="Todos" value="ALL" />
            <NativeBaseSelect.Item label="Aberto" value="OPEN" />
            <NativeBaseSelect.Item label="Em andamento" value="IN_PROGRESS" />
            <NativeBaseSelect.Item label="Finalizado" value="CLOSED" />
            <NativeBaseSelect.Item label="Cancelado" value="CANCELED" />
        </NativeBaseSelect>
    );
}