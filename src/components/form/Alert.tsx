import { GestureResponderEvent } from 'react-native';
import { Alert as NativeBaseAlert, IAlertProps, VStack, HStack, Text, IconButton, CloseIcon, Collapse } from 'native-base';

type Props = IAlertProps & {
    status: "success" | "error" | "info" | "warning";
    header: string;
    onPress: (onPress: GestureResponderEvent) => void;
}

export function Alert({ status, header, onPress, ...rest }: Props) {
    return (
        <NativeBaseAlert
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
                        onPress={onPress}
                    />
                </HStack>
            </VStack>
        </NativeBaseAlert>
    );
}