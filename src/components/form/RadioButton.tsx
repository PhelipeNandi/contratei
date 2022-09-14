import { HStack, Text, Radio, IRadioGroupProps, FormControl, WarningOutlineIcon } from 'native-base';

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
        <FormControl isInvalid={!!errorMessage}>
            <Radio.Group
                flex={1}
                alignItems="center"
                {...rest}
            >
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

                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errorMessage}
                </FormControl.ErrorMessage>
            </Radio.Group>
        </FormControl>
    );
}