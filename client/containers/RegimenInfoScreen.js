import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";

import CommonNavOpts from "./CommonNavOpts";

class RegimenInfoScreen extends React.Component {
    static navigationOptions = {
        title: "Regimen Information",
        ...CommonNavOpts
    };

    state = {
    };

    componentDidMount() {}

    render() {
        return (
            <View>
                <Button onPress={this.onSubmit} title="Submit" color="#841584" />
            </View>
        );
    }

    onSubmit = () => {
        this.props.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Main" })]
            })
        );
    }
}

export default connect(state => ({
    navState: state.navState
}))(RegimenInfoScreen);
