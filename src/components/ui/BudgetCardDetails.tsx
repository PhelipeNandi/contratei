import { VStack, HStack, Pressable, IPressableProps, Circle, useTheme, Text } from 'native-base';
import { Briefcase } from 'phosphor-react-native';

import { Budget } from '../../types/budget';

type Props = IPressableProps & {
    data?: Budget
}

export function BudgetCardDetails({ data, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <Pressable>
            <HStack my={4} justifyContent="space-between">
                <HStack>
                    <Circle bg="gray.100" h={16} w={16}>
                        <Briefcase size={24} color={colors.primary[700]} weight="fill" />
                    </Circle>

                    <VStack pl={4}>
                        <Text fontFamily="mono" fontSize="md" color="gray.700">
                            {data.title}
                        </Text>
                        <Text fontFamily="mono" fontSize="sm" color="gray.300">
                            {data.serviceType}
                        </Text>
                        <Text fontFamily="mono" fontSize="sm" color="gray.300">
                            {data.value}
                        </Text>
                    </VStack>
                </HStack>

                <VStack justifyContent="space-between">
                    <Text textAlign="right" fontFamily="mono" fontSize="md" color="gray.300">
                        {data.openingDate}
                    </Text>

                    <Text textAlign="right" fontFamily="mono" fontSize="sm" color="gray.300">
                        {
                            data.status === 'open'
                                ? "Aberto"
                                : "Finalizado"
                        }
                    </Text>
                </VStack>
            </HStack>
        </Pressable >
    );
}