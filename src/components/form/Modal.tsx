import { ReactNode } from 'react';
import { Modal as NativeBaseModal, IModalProps } from 'native-base';
import { IconProps } from 'phosphor-react-native';

type Props = IModalProps & {
    header: string;
    body: string;
    children: ReactNode;
    icon: React.ElementType<IconProps>;
}

export function Modal({ header, body, children, icon: Icon, ...rest }: Props) {
    return (
        <NativeBaseModal {...rest}>
            <NativeBaseModal.Content maxWidth="350" maxH="212">
                <NativeBaseModal.CloseButton />
                <NativeBaseModal.Header>
                    {header}
                </NativeBaseModal.Header>
                <NativeBaseModal.Body>
                    {body}
                </NativeBaseModal.Body>
                <NativeBaseModal.Footer>
                    {children}
                </NativeBaseModal.Footer>
            </NativeBaseModal.Content>
        </NativeBaseModal>
    );
}