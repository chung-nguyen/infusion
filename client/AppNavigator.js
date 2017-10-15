import { StackNavigator } from "react-navigation";

import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";

export default StackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen }
});
