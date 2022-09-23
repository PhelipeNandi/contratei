import { ReactNode } from 'react';
import { Box, IBoxProps, HStack, Text, useTheme, VStack } from 'native-base';
import { IconProps } from 'phosphor-react-native';

type Props = IBoxProps & {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function CardDetails({
    title,
    description,
    footer = null,
    icon: Icon,
    children,
    ...rest
}: Props) {
    const { colors } = useTheme();

    return (
        <VStack
            my={3}
            p={5}
            shadow={2}
            bg="gray.100"
            rounded="lg"
            {...rest}
        >
            <HStack alignItems="center" mb={4}>
                <Icon color={colors.primary[700]} weight="fill" />
                <Text ml={2} color="primary.700" fontSize="sm" textTransform="uppercase">
                    {title}
                </Text>
            </HStack>

            {
                !!description &&
                <Text color="gray.400" fontSize="md">
                    {description}
                </Text>
            }

            {children}

            {
                !!footer &&
                <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
                    <Text mt={3} color="gray.300" fontSize="sm">
                        {footer}
                    </Text>
                </Box>
            }
        </VStack>
    );
}