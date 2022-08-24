import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/ui/Button';

export function MyBudgets() {
    const navigation = useNavigation();

    return (
        <VStack flex={1} justifyContent="center" >
            <Button
                mx={8}
                mb={2}
                title="Voltar"
                onPress={() => navigation.goBack()}
            />
        </VStack >
    );
}