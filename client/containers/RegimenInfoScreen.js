import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";
import * as ActionTypes from "../reducers/actions";

class RegimenInfoScreen extends React.Component {
    static navigationOptions = {
        title: "Regimen Information"
    };

    state = {
        dayPerInfusion: 0,
        numberOfInfusion: 0,
        startInfusionDate: 0
    };

    componentDidMount() {
        this._updateProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._updateProps(nextProps);
    }

    render() {
        return (
            <View>
                <Text>dayPerInfusion:</Text>
                <TextInput onChangeText={text => this.setState({ dayPerInfusion: parseInt(text) })} value={this.state.dayPerInfusion.toString()} />
                <Text>numberOfInfusion:</Text>
                <TextInput onChangeText={text => this.setState({ numberOfInfusion: parseInt(text) })} value={this.state.numberOfInfusion.toString()} />
                <Text>startInfusionDate:</Text>
                <TextInput onChangeText={text => this.setState({ startInfusionDate: parseInt(text) })} value={this.state.startInfusionDate.toString()} />

                <Button onPress={this.onSubmit} title="Submit" color="#841584" />
            </View>
        );
    }

    onSubmit = () => {
        // TODO: better unique ID generation, but perhaps this is enough
        var regimenData = { ...this.state, id: Date.now().toString() };

        this.props
            .dispatch(ActionTypes.setRegimenInfo(regimenData))
            .then(() => {
                return this.props.dispatch(
                    NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: "Main" })]
                    })
                );
            })
            .catch(err => {
                // TODO - show error dialog
            });
    };

    _updateProps = props => {
        this.setState(props.regimenInfo);
    };
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo
}))(RegimenInfoScreen);
