import { useState } from 'react';
import { VStack } from 'native-base';
import { Header } from '../../components/ui/Header';
import { SelectPriorityLevel } from '../../features/searchBudgets';

export function SearchBudgets() {
    const [priorityLevelSelect, setPriorityLevelSelect] = useState<string>();

    return (
        <VStack>
            <Header title="Buscar Orçamentos" />

            <VStack flex={1} bg="background">

                <SelectPriorityLevel
                    my={2}
                    mx={3}
                    onValueChange={(selectValue) => setPriorityLevelSelect(selectValue)}
                />

            </VStack>
        </VStack>
    );
}