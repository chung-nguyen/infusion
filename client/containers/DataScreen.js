import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";

import CommonNavOpts from "./CommonNavOpts";

class DataScreen extends React.Component {
    static navigationOptions = {
        title: "Data",
        ...CommonNavOpts
    };

    state = {
    };

    componentDidMount() {}

    render() {
        return (
            <View>
            </View>
        );
    }
}

export default connect(state => ({
    navState: state.navState
}))(DataScreen);
