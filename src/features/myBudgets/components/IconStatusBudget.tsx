import { Circle, useTheme } from 'native-base';
import { Briefcase } from 'phosphor-react-native';

type Props = {
    status: string;
}

export function IconStatusBudget({ status }: Props) {
    const { colors } = useTheme();

    switch (status) {
        case "open":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["open"]} weight="fill" />
                </Circle>
            )
        case "inProgress":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["inProgress"]} weight="fill" />
                </Circle>
            )
        case "finish":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["finish"]} weight="fill" />
                </Circle>
            )
        case "canceled":
            return (
                <Circle bg="white" shadow={2} h={16} w={16}>
                    <Briefcase size={24} color={colors.status["canceled"]} weight="fill" />
                </Circle>
            )
    }
}