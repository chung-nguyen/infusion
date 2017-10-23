import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import Spinner from "react-native-spinkit";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";
import * as Actions from "../reducers/actions";

import CommonNavOpts from "./CommonNavOpts";

class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: "Sign Up",
        ...CommonNavOpts
    };

    state = {
        email: "test@gmail.com",
        password: "abc123",
        step: 0,
        isLoading: false
    };

    componentDidMount() {}

    render() {
        return (
            <View>
                {this.state.step === 0 && (
                    <View>
                        <Text>Email:</Text>
                        <TextInput onChangeText={text => this.setState({ email: text })} value={this.state.email} />
                        <Text>Password:</Text>
                        <TextInput onChangeText={text => this.setState({ password: text })} secureTextEntry={true} value={this.state.password} />

                        <Button onPress={this.onPressSignUp} title="Sign Up" color="#841584" />
                    </View>
                )}

                {this.state.step === 1 && (
                    <View>
                        <Text>EULA</Text>
                        <Button onPress={this.onPressAgree} title="Agree" color="#841584" />
                    </View>
                )}

                <Spinner isVisible={this.state.isLoading} size={50 * config.UI_SCALE} type="Circle" color="#000000" />
            </View>
        );
    }

    onPressSignUp = () => {
        this.setState({ step: 1 });
    };

    onPressAgree = () => {
        const email = this.state.email;
        const password = md5(this.state.password, config.PASSWORD_SECRET);

        this.setState({ isLoading: true });
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                if (user) {
                    this.props.dispatch(Actions.setAuthenticateState({ user })).then(() => {
                        this.props.dispatch(
                            NavigationActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: "RegimenInfo" })]
                            })
                        );
                    });
                } else {
                    // TODO: show error
                }

                this.setState({ isLoading: false });
            })
            .catch(err => {
                // TODO: show error

                this.setState({ isLoading: false });
            });
    };
}

export default connect(state => ({
    navState: state.navState
}))(SignUpScreen);
