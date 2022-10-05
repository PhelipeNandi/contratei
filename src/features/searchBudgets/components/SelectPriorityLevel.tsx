import { Select as NativeBaseSelect, ISelectProps } from 'native-base';

export function SelectPriorityLevel({ ...rest }: ISelectProps) {
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
            <NativeBaseSelect.Item label="Hoje" value="TODAY" />
            <NativeBaseSelect.Item label="Essa semana" value="THIS_WEEK" />
            <NativeBaseSelect.Item label="Esse mês" value="THIS_MONTH" />
            <NativeBaseSelect.Item label="A combinar" value="COMBINE" />
        </NativeBaseSelect>
    );
}