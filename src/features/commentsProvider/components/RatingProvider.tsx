import { useTheme, Box, Text, HStack } from 'native-base';
import { SmileySad, Smiley, SmileyMeh } from 'phosphor-react-native';

import { normalizeRatingProvider } from '../../../utils/formatStrings';

type Props = {
    data: string;
}

export function RatingProvider({ data }: Props) {
    const { colors } = useTheme();
    const rating = normalizeRatingProvider(data);

    return (
        <HStack justifyContent="flex-end" alignItems="center" space={1}>
            {
                rating < 5
                    ? <SmileySad size={23} color={colors.red[700]} weight="regular" />
                    : rating > 5 && rating < 7
                        ? <SmileyMeh size={23} color={colors.yellow[700]} weight="regular" />
                        : <Smiley size={23} color={colors.green[700]} weight="regular" />
            }

            <Text textAlign="center" fontFamily="mono" fontSize="md" color="primary.700">
                {rating}
            </Text>
        </HStack>
    )
}