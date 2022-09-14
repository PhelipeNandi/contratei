import { VStack, HStack, Text, Radio, IRadioGroupProps } from 'native-base';

type Props = IRadioGroupProps & {
    optionOne: string;
    optionTwo: string;
    errorMessage?: string;
}

export function RadioButton({
    optionOne,
    optionTwo,
    errorMessage,
    ...rest
}: Props) {
    return (
        <Radio.Group
            flex={1}
            alignItems="center"
            {...rest}
        >
            <VStack>
                <HStack space={6}>
                    <Radio value={optionOne}>
                        <Text fontSize="md">
                            {optionOne}
                        </Text>
                    </Radio>
                    <Radio value={optionTwo}>
                        <Text fontSize="md">
                            {optionTwo}
                        </Text>
                    </Radio>
                </HStack>

                {
                    !!errorMessage &&
                    <Text textAlign="center" fontSize="sm" color="error.600" flex={1} mt={2}>
                        {errorMessage}
                    </Text>
                }
            </VStack>
        </Radio.Group>
    );
}