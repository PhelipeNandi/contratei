import { useAuthContext } from "../hooks/useAuthContext";
import { ShowConsumerBottomTabs } from "./Navigators/ConsumerBottomTabs";
import { ShowProviderBottomTabs } from "./Navigators/ProviderBottomTabs";

export function AuthRoutes() {
    const { isConsumer } = useAuthContext();

    return (
        isConsumer
            ? <ShowConsumerBottomTabs />
            : <ShowProviderBottomTabs />
    );
}