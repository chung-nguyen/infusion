import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";
import * as Actions from "../reducers/actions";

class SettingScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {};

    componentDidMount() {}

    render() {
        return (
            <View>
                <Button onPress={this.onSignOut} title="Sign Out" color="#841584" />
            </View>
        );
    }

    onSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                return this.props.dispatch(Actions.setAuthenticateState(null)).then(() => {
                    this.props.dispatch(
                        NavigationActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: "Home" })]
                        })
                    );
                });
            })
            .catch(err => {
                // TODO show error
            });
    };
}

export default connect(state => ({
    navState: state.navState
}))(SettingScreen);
