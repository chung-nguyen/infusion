import { StackNavigator } from "react-navigation";

import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import SignUpScreen from "./containers/SignUpScreen";
import RegimenInfoScreen from "./containers/RegimenInfoScreen";
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

        Main: { screen: MainNavigator }
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            headerStyle: scaleStyle({ height: 40 })
        }
    }
);
