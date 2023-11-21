import Screen02 from "./screens/Screen02";
import Screen01 from "./screens/Screen01";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen03 from "./screens/Screen03";
import { Provider } from "react-redux";
import store from "./redux-toolkit/configureStore";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="App">
                    <Stack.Screen
                        name="screen01"
                        component={Screen01}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="screen02"
                        component={Screen02}
                        // options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="screen03"
                        component={Screen03}
                        // options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
