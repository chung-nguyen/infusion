import { TabNavigator } from "react-navigation";

import OverviewScreen from "./containers/OverviewScreen";
import DataScreen from "./containers/DataScreen";
import SettingScreen from "./containers/SettingScreen";

export default TabNavigator(
    {
        Overview: { screen: OverviewScreen },
        Data: { screen: DataScreen },
        Setting: { screen: SettingScreen }
    },
    {
        initialRouteName: "Overview"
    }
);
