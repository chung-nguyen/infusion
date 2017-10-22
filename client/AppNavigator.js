import { StackNavigator } from "react-navigation";

import DummyScreen from "./containers/DummyScreen";
import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import SignUpScreen from "./containers/SignUpScreen";

export default StackNavigator({
    Dummy: { screen: DummyScreen },
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
});
