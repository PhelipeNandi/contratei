import { VStack, HStack, Pressable, IPressableProps, Text } from 'native-base';

import { IconStatusBudget } from './IconStatusBudget';
import { Budget } from '../../../types/budget';

type Props = IPressableProps & {
    data?: Budget
}

export function BudgetCardDetails({ data, ...rest }: Props) {
    function handleStatusName(status: string) {
        switch (status) {
            case "open":
                return "Aberto";
            case "inProgress":
                return "Em andamento";
            case "finish":
                return "Finalizado";
            case "canceled":
                return "Cancelado";
        }
    }

    return (
        <Pressable {...rest}>
            <HStack my={4} justifyContent="space-between">
                <HStack>
                    <IconStatusBudget status={data.status} />

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
                        {handleStatusName(data.status)}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    );
}