import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";
import Spinner from "react-native-spinkit";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";
import * as Actions from "../reducers/actions";

import CommonNavOpts from "./CommonNavOpts";

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: "Login",
        ...CommonNavOpts
    };

    state = {
        email: "test@gmail.com",
        password: "abc123",
        isLoading: false
    };

    componentDidMount() {}

    render() {
        return (
            <View>
                <Text>Email:</Text>
                <TextInput onChangeText={text => this.setState({ email: text })} value={this.state.email} />
                <Text>Password:</Text>
                <TextInput onChangeText={text => this.setState({ password: text })} secureTextEntry={true} value={this.state.password} />
                <Button onPress={this.onPressLogin} title="Login" color="#841584" />
                <Button onPress={this.onPressSignUp} title="Sign Up" color="#841584" />
                <Button onPress={this.onPressLoginWithCancerBase} title="Login with Cancer Base" color="#841584" />

                <Spinner isVisible={this.state.isLoading} size={50 * config.UI_SCALE} type="Circle" color="#000000" />
            </View>
        );
    }

    onPressLogin = () => {
        const email = this.state.email;
        const password = md5(this.state.password, config.PASSWORD_SECRET);

        this.setState({ isLoading: true });
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                if (user) {
                    return this.props.dispatch(Actions.setAuthenticateState({ user })).then(() => {
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
                // TODO: show error message
                console.error(err);
                this.setState({ isLoading: false });
            });
    };

    onPressSignUp = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: "SignUp" }));
    };

    onPressLoginWithCancerBase() {}
}

export default connect(state => ({
    navState: state.navState
}))(LoginScreen);
