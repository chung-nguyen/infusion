import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";

import CommonNavOpts from "./CommonNavOpts";

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: "Login",
        ...CommonNavOpts
    };

    state = {
        email: "test@gmail.com",
        password: "abc123"
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
            </View>
        );
    }

    onPressLogin = () => {
        const email = this.state.email;
        const password = md5(this.state.password, config.PASSWORD_SECRET);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {})
            .catch(err => {
                // TODO
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
