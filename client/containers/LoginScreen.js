import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import config from "../config";
import { scaleStyle } from "../utils/scaleUIStyle";

import CommonNavOpts from "./CommonNavOpts";

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Login",
        ...CommonNavOpts
    };

    componentDidMount() {}

    render() {
        return (
            <View>
                <Text>Login: {this.props.navState.index}</Text>
            </View>
        );
    }
}

export default connect(state => ({
    navState: state.navState
}))(HomeScreen);
