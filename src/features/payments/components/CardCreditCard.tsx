import { HStack, Text, useTheme } from 'native-base';
import { CreditCard as CreditCardIcon, DotsThree } from 'phosphor-react-native';

export function CardCreditCard() {
    const { colors } = useTheme();

    return (
        <HStack mt={5} alignItems="center">
            <CreditCardIcon color={colors.primary[700]} size={32} />

            <HStack pt={1} alignItems="center">
                <DotsThree color={colors.black} size={24} />

                <Text fontFamily="body" fontSize="sm" color="primary.700">
                    444 (Crédito)
                </Text>
            </HStack>
        </HStack>
    );
}