import { HStack, Text, Radio, IRadioGroupProps } from 'native-base';

type Props = IRadioGroupProps & {
    optionOne: string;
    optionTwo: string;
}

export function RadioButton({
    optionOne,
    optionTwo,
    ...rest
}: Props) {
    return (
        <Radio.Group
            flex={1}
            h={14}
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
        </Radio.Group>
    );
}