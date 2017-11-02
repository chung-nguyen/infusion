import { StackNavigator } from "react-navigation";

import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import SignUpScreen from "./containers/SignUpScreen";
import RegimenInfoScreen from "./containers/RegimenInfoScreen";
import InputSideEffectsScreen from "./containers/InputSideEffectsScreen";
import DummyScreen from "./containers/DummyScreen";

import MainNavigator from "./MainNavigator";
import { scaleStyle } from "./utils/scaleUIStyle";

export default StackNavigator(
    {
        Home: { screen: HomeScreen },
        Login: { screen: LoginScreen },
        SignUp: { screen: SignUpScreen },
        RegimenInfo: { screen: RegimenInfoScreen },
        Dummy: { screen: DummyScreen },
        InputSideEffects: { screen: InputSideEffectsScreen },

        Main: { screen: MainNavigator }
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            headerStyle: scaleStyle({ height: 40 })
        }
    }
);
