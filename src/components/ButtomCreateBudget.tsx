import { VStack, useTheme } from 'native-base';
import { MagnifyingGlass } from 'phosphor-react-native';

export function ButtomCreateBudget({ size, color, isFocused }) {
    const { colors } = useTheme();

    return (
        <VStack
            w={16}
            h={16}
            justifyContent="center"
            alignItems="center"
            borderRadius={32}
            shadow={8}
            mb={5}
            bg="#4B77BE"
        >
            <MagnifyingGlass size={size} color={colors.white} weight={isFocused ? "fill" : "regular"} />
        </VStack>
    );
}