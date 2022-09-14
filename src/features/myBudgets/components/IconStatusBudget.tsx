import { Circle, useTheme } from 'native-base';
import { Briefcase } from 'phosphor-react-native';

type Props = {
    status: string;
}

export function IconStatusBudget({ status }: Props) {
    const { colors } = useTheme();

    switch (status) {
        case "OPEN":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["open"]} weight="fill" />
                </Circle>
            )
        case "IN_PROGRESS":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["inProgress"]} weight="fill" />
                </Circle>
            )
        case "CLOSED":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["closed"]} weight="fill" />
                </Circle>
            )
        case "CANCELED":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["canceled"]} weight="fill" />
                </Circle>
            )
    }
}