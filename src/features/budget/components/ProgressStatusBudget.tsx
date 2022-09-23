import { Progress, useTheme } from 'native-base';

type Props = {
    status: string;
}

export function ProgressStatusBudget({ status }: Props) {
    const { colors } = useTheme();

    switch (status) {
        case "OPEN":
            return (
                <Progress
                    mx={8}
                    bg="gray.200"
                    value={25}
                    _filledTrack={{
                        bg: "status.open"
                    }}
                />
            )
        case "IN_PROGRESS":
            return (
                <Progress
                    mx={8}
                    bg="gray.200"
                    value={50}
                    _filledTrack={{
                        bg: "status.inProgress"
                    }}
                />
            )
        case "CLOSED":
            return (
                <Progress
                    mx={8}
                    bg="gray.200"
                    value={100}
                    _filledTrack={{
                        bg: "status.closed"
                    }}
                />
            )
        case "CANCELED":
            return (
                <Progress
                    mx={8}
                    bg="gray.200"
                    value={100}
                    _filledTrack={{
                        bg: "status.canceled"
                    }}
                />
            )
    }
}