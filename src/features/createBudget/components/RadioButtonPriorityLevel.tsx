import { Text, Radio, IRadioGroupProps, FormControl, WarningOutlineIcon } from 'native-base';

type Props = IRadioGroupProps & {
    errorMessage?: string;
}

export function RadioButtonPriorityLevel({
    errorMessage,
    ...rest
}: Props) {
    return (
        <FormControl isInvalid={!!errorMessage}>
            <Radio.Group space={4} {...rest}>
                <Radio value="TODAY" colorScheme="red">
                    <Text fontSize="sm">
                        Hoje
                    </Text>
                </Radio>
                <Radio value="THIS_WEEK" colorScheme="warning">
                    <Text fontSize="sm">
                        Essa semana
                    </Text>
                </Radio>
                <Radio value="THIS_MONTH" colorScheme="yellow">
                    <Text fontSize="sm">
                        Esse mês
                    </Text>
                </Radio>
                <Radio value="COMBINE" colorScheme="green">
                    <Text fontSize="sm">
                        A combinar
                    </Text>
                </Radio>

                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errorMessage}
                </FormControl.ErrorMessage>
            </Radio.Group>
        </FormControl>
    );
}