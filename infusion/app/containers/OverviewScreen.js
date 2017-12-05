import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";

class OverviewScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {};

    componentDidMount() {}

    render() {
        return (
            <View>
                <Button onPress={this.onPressInputSideEffects} title="Input Side Effects" color="#841584" />
            </View>
        );
    }

    onPressInputSideEffects = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: "InputSideEffects" }));
    };
}

export default connect(state => ({
    navState: state.navState
}))(OverviewScreen);
