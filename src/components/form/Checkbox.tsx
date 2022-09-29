import { Box, Checkbox as NativeBaseCheckBox, ICheckboxProps, Text } from 'native-base';

type Props = ICheckboxProps & {
    title: string;
    value: string;
}

export function Checkbox({ value, title, ...rest }: Props) {
    return (
        <Box
            h={10}
            p={1}
            justifyContent="center"
        >
            <NativeBaseCheckBox value={value} {...rest}>
                <Text textAlign="center" fontFamily="mono" fontSize="md" color="primary.700">
                    {title}
                </Text>
            </NativeBaseCheckBox>
        </Box >
    );
}