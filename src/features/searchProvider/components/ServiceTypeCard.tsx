import { Circle, useTheme, Pressable, IPressableProps } from 'native-base';
import { PaintRoller, Wrench } from 'phosphor-react-native';

import Empregado from '../../../assets/svg/serviceTypes/empregado.svg';
import Marceneiro from '../../../assets/svg/serviceTypes/marceneiro.svg';
import Pedreiro from '../../../assets/svg/serviceTypes/pedreiro.svg';

type Props = IPressableProps & {
    serviceType: string;
}

export function ServiceTypeCard({ serviceType, ...rest }: Props) {
    const { colors } = useTheme();

    switch (serviceType) {
        case "EMPREGADO":
            return (
                <Pressable {...rest}>
                    <Circle ml={5} mr={10} bg="white" borderWidth={1} borderColor="primary.700" h={16} w={16}>
                        <Empregado width={25} height={25} />
                    </Circle>
                </Pressable>
            )
        case "MARCENEIRO":
            return (
                <Pressable {...rest}>
                    <Circle ml={5} bg="white" borderWidth={1} borderColor="primary.700" h={16} w={16}>
                        <Marceneiro width={25} height={25} />
                    </Circle>
                </Pressable>
            )
        case "PINTOR":
            return (
                <Pressable {...rest}>
                    <Circle ml={5} bg="white" borderWidth={1} borderColor="primary.700" h={16} w={16}>
                        <PaintRoller size={25} color={colors.primary[700]} />
                    </Circle>
                </Pressable>
            )
        case "PEDREIRO":
            return (
                <Pressable {...rest}>
                    <Circle ml={5} bg="white" borderWidth={1} borderColor="primary.700" h={16} w={16}>
                        <Pedreiro width={25} height={25} />
                    </Circle>
                </Pressable>
            )
        case "MECANICO":
            return (
                <Pressable {...rest}>
                    <Circle ml={5} bg="white" borderWidth={1} borderColor="primary.700" h={16} w={16}>
                        <Wrench size={25} color={colors.primary[700]} />
                    </Circle>
                </Pressable>
            )
    }
}