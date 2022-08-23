import { VStack, Text, Radio, IRadioGroupProps, useTheme } from 'native-base';

type Props = IRadioGroupProps & {
    errorMessage?: string;
}

export function RadioButtonPriorityLevel({
    errorMessage,
    ...rest
}: Props) {
    const { colors } = useTheme();

    return (
        <Radio.Group {...rest}>
            <VStack>
                <VStack space={6}>
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
                </VStack>

                {
                    !!errorMessage &&
                    <Text textAlign="right" fontSize="sm" color="red.600" mt={2}>
                        {errorMessage}
                    </Text>
                }
            </VStack>
        </Radio.Group>
    );
}