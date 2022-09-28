import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
    variant: "primary" | "sucess" | "warning" | "danger" | "info";
}

export function Button({ title, variant, ...rest }: Props) {
    switch (variant) {
        case "primary":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="primary.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "primary.700" }}
                    _disabled={{ bg: "gray.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "sucess":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="green.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "green.700" }}
                    _disabled={{ bg: "gray.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "warning":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="yellow.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "yellow.700" }}
                    _disabled={{ bg: "gray.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "danger":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="red.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "red.700" }}
                    _disabled={{ bg: "gray.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
        case "info":
            return (
                <ButtonNativeBase
                    h={14}
                    bg="secondary.600"
                    fontSize="sm"
                    rounded="sm"
                    _pressed={{ bg: "secondary.700" }}
                    _disabled={{ bg: "gray.700" }}
                    {...rest}
                >
                    <Heading color="white" fontSize="sm">
                        {title}
                    </Heading>
                </ButtonNativeBase>
            );
    }
}