import React from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, Button } from "react-native";
import { NavigationActions } from "react-navigation";

import * as ActionTypes from "../reducers/actions";

class InputSideEffectsScreen extends React.Component {
    static navigationOptions = {
        title: "Side Effects"
    };

    state = {
        fatigue: 0,
        nausea: 0,
        appetite: 0,
        pain: 0
    };

    render() {
        return (
            <View>
                <Text>Fatigue:</Text>
                <TextInput onChangeText={text => this.setState({ fatigue: parseInt(text) })} value={this.state.fatigue.toString()} />
                <Text>Nausea:</Text>
                <TextInput onChangeText={text => this.setState({ nausea: parseInt(text) })} value={this.state.nausea.toString()} />
                <Text>Appetite:</Text>
                <TextInput onChangeText={text => this.setState({ appetite: parseInt(text) })} value={this.state.appetite.toString()} />
                <Text>Pain:</Text>
                <TextInput onChangeText={text => this.setState({ pain: parseInt(text) })} value={this.state.pain.toString()} />

                <Button onPress={this.onSubmit} title="Submit" color="#841584" />
            </View>
        );
    }

    onSubmit = () => {
        var regimenInfo = this.props.regimenInfo;

        if (regimenInfo.id != null) {
            var timestamp = Date.now();

            this.props
                .dispatch(ActionTypes.setSideEffectData(regimenInfo.id, timestamp, this.state))
                .then(() => {
                    this.props.dispatch(NavigationActions.back());
                })
                .catch(err => {
                    // TODO: show error dialog
                });
        } else {
            this.props.dispatch(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "RegimenInfo" })]
                })
            );
        }
    };
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo,
    sideEffect: state.sideEffect
}))(InputSideEffectsScreen);
