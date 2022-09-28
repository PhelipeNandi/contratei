import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
    variant: "PRIMARIO" | "SUCESSO" | "AVISO" | "PERIGO" | "INFO";
}

export function Button({ title, variant, ...rest }: Props) {
    switch (variant) {
        case "PRIMARIO":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="primary.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "primary.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "SUCESSO":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="green.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "green.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "AVISO":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="yellow.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "yellow.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "PERIGO":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="red.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "red.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "INFO":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="secondary.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "secondary.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
    }
}