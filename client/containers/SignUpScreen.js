import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import firebase from 'react-native-firebase';

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";

import CommonNavOpts from "./CommonNavOpts";

class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: "Sign Up",
        ...CommonNavOpts
    };

    state = {
        email: "test@gmail.com",
        password: "abc123",
        step: 0
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
            </View>
        );
    }

    onPressSignUp = () => {
        this.setState({step: 1});
    }

    onPressAgree = () => {
        const email = this.state.email;
        const password = md5(this.state.password, config.PASSWORD_SECRET);
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            
        }).catch(err => {
            // TODO
        });
    }
}

export default connect(state => ({
    navState: state.navState
}))(SignUpScreen);
