import { Alert as NativeBaseAlert, IAlertProps, VStack, HStack, Text, IconButton, Box, CloseIcon, Collapse, Center } from 'native-base';

type Props = IAlertProps & {
    status: "success" | "error" | "info" | "warning";
    header: string;
}

export function Alert({ status, header, ...rest }: Props) {
    return (
        <NativeBaseAlert
            maxW={80}
            top={32}
            position="absolute"
            alignSelf="center"
            borderRadius="lg"
            status={status}
            {...rest}
        >
            <VStack w="100%">
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack space={2}>
                        <NativeBaseAlert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {header}
                        </Text>
                    </HStack>

                    <IconButton
                        _focus={{ borderWidth: 0 }}
                        icon={<CloseIcon size="3" />}
                        _icon={{ color: "coolGray.600" }}
                    />
                </HStack>
            </VStack>
        </NativeBaseAlert>
    );
}