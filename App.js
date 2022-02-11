import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import useFonts from "./hooks/useFonts";
import AppLoading from "expo-app-loading";
import StackNavigator from "./StackNavigator"
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
    const [loaded, setLoaded] = React.useState(false);

    const loadFonts = async () => {
        await useFonts();
    };

    if (!loaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setLoaded(true)}
                onError={() => { }}
            />
        );
    }

    return (
        <NativeBaseProvider>
            <AuthProvider>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </AuthProvider>
        </NativeBaseProvider>
    );
  }

 

export default App;