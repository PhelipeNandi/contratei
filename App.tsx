import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { AuthProvider } from "./src/contexts/authContext";
import { THEME } from "./src/styles/themes";

import { Routes } from './src/routes';
import { Loading } from "./src/components/ui/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthProvider>
    </NativeBaseProvider>
  );
}