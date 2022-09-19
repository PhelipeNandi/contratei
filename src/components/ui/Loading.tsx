import { Center, ICenterProps, Spinner } from 'native-base';

export function Loading({ ...rest }: ICenterProps) {
    return (
        <Center flex={1} {...rest}>
            <Spinner color="primary.700" size="lg" />
        </Center>
    );
}