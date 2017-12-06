import {TabNavigator, TabBarTop} from "react-navigation";
import {scaleStyle} from "../utils/scaleUIStyle";
import OverviewScreen from "../containers/OverviewScreen";
import DataScreen from "../containers/DataScreen";
import SettingScreen from "../containers/SettingScreen";
import config from "../config";

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
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            style: scaleStyle({height: 120, backgroundColor: 'transparent'}),
            tabStyle: scaleStyle({marginTop: 40}),
            labelStyle: scaleStyle({
                fontSize: 32,
                fontFamily: config.GENERIC_FONT_BOLD
            })
        }
    }
);
