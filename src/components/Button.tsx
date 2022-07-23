import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {
    return (
        <ButtonNativeBase
            bg="primary.700"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{ bg: "primary.200" }}
            {...rest}
        >
            <Heading color="gray.500" fontSize="sm">
                {title}
            </Heading>
        </ButtonNativeBase>
    );
}