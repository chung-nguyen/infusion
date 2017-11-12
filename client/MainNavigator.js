import { TabNavigator } from "react-navigation";

import OverviewScreen from "./containers/OverviewScreen";
import DataScreen from "./containers/DataScreen";
import SettingScreen from "./containers/SettingScreen";

import { scaleStyle } from "./utils/scaleUIStyle";

export default TabNavigator(
    {
        Overview: { screen: OverviewScreen },
        Data: { screen: DataScreen },
        Setting: { screen: SettingScreen }
    },
    {
        initialRouteName: "Overview",
        navigationOptions: {
            headerStyle: scaleStyle({ height: 40 })            
        },
        cardStyle: { backgroundColor: "#ffffff" }
    }
);
