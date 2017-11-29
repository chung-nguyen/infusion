import React, {Component} from "react";
import PropTypes from "prop-types";
import {addNavigationHelpers, StackNavigator} from "react-navigation";
import {connect} from "react-redux";
import HomeScreen from "../containers/HomeScreen";
import LoginScreen from "../containers/LoginScreen";
import SignUpScreen from "../containers/SignUpScreen";
import RegimenInfoScreen from "../containers/RegimenInfoScreen";
import InputSideEffectsScreen from "../containers/InputSideEffectsScreen";
import DummyScreen from "../containers/DummyScreen";

import MainNavigator from "./MainNavigator";
import {scaleStyle} from "../utils/scaleUIStyle";

export const AppNavigator = StackNavigator(
    {
        Home: {screen: HomeScreen},
        Login: {screen: LoginScreen},
        SignUp: {screen: SignUpScreen},
        RegimenInfo: {screen: RegimenInfoScreen},
        Dummy: {screen: DummyScreen},
        InputSideEffects: {screen: InputSideEffectsScreen},

        Main: {screen: MainNavigator}
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            headerStyle: scaleStyle({height: 80})
        },
        cardStyle: {backgroundColor: "#ffffff"}
    }
);

class AppWithNavigationState extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let {dispatch, appNav} = this.props;
        return (
            <AppNavigator navigation={addNavigationHelpers({dispatch, state: appNav})}/>
        )
    }
}

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    rootNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    appNav: state.appNav,
});

export default connect(mapStateToProps)(AppWithNavigationState);