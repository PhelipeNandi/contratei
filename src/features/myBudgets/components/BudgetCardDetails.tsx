import { VStack, HStack, Pressable, IPressableProps, Text } from 'native-base';

import { IconStatusBudget } from './IconStatusBudget';
import { Budget } from '../../../types/budget';

import { normalizeDateCardBudget } from '../../../utils/formatDates';
import { normalizeStatus, normalizeServiceType, normalizeBudgetValue } from '../../../utils/formatStrings';

type Props = IPressableProps & {
    data?: Budget
}

export function BudgetCardDetails({ data, ...rest }: Props) {
    return (
        <Pressable {...rest}>
            <HStack my={4} justifyContent="space-between">
                <HStack>
                    <IconStatusBudget status={data.status} />

                    <VStack pl={4}>
                        <Text fontFamily="mono" fontSize="sm" color="gray.700">
                            {data.title}
                        </Text>
                        <Text fontFamily="mono" fontSize="sm" color="gray.300">
                            {normalizeServiceType(data.serviceType)}
                        </Text>
                        <Text fontFamily="mono" fontSize="sm" color="gray.300">
                            {normalizeBudgetValue(data.value)}
                        </Text>
                    </VStack>
                </HStack>

                <VStack justifyContent="space-between">
                    <Text textAlign="right" fontFamily="mono" fontSize="md" color="gray.300">
                        {normalizeDateCardBudget(data.openingDate)}
                    </Text>

                    <Text textAlign="right" fontFamily="mono" fontSize="sm" color="gray.300">
                        {normalizeStatus(data.status)}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    );
}