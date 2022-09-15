import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { propsStack } from '../../routes/Navigators/Models';

import { Button } from '../../components/ui/Button';

export function SearchProvider() {
    const navigation = useNavigation<propsStack>();

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