import {TabNavigator, TabBarTop} from "react-navigation";

import OverviewScreen from "../containers/OverviewScreen";
import DataScreen from "../containers/DataScreen";
import SettingScreen from "../containers/SettingScreen";

import {scaleStyle} from "../utils/scaleUIStyle";

export default TabNavigator(
    {
        Overview: { screen: OverviewScreen },
        Data: { screen: DataScreen },
        Setting: { screen: SettingScreen }
    },
    {
        tabBarPosition: 'top',
        tabBarComponent: TabBarTop,
        initialRouteName: "Overview",
        tabBarOptions: {
            activeTintColor: '#e91e63',
            style: scaleStyle({height: 96}),
            labelStyle: scaleStyle({
                fontSize: 32
            })
        }
    }
);
