import React from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
// import firebase from "react-native-firebase";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle, scaleStyleSheet } from "../utils/scaleUIStyle";

import LoadingOverlay from "../components/LoadingOverlay";

class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: "Sign Up"
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
            <View style={styles.flex}>
                {this.state.step === 0 && (
                    <View style={styles.flex}>
                        <View style={styles.vgap20} />

                        <Text style={styles.formLabel}>Email/Account:</Text>
                        <TextInput onChangeText={text => this.setState({ email: text })} value={this.state.email} style={styles.formInput} />

                        <View style={styles.vgap20} />

                        <Text style={styles.formLabel}>Password:</Text>
                        <TextInput onChangeText={text => this.setState({ password: text })} secureTextEntry={true} value={this.state.password} style={styles.formInput} />

                        <View style={styles.flex} />

                        <TouchableOpacity onPress={this.onPressSignUp} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {this.state.step === 1 && (
                    <View style={styles.flex}>
                        <Text>EULA</Text>

                        <View style={styles.flex} />

                        <TouchableOpacity onPress={this.onPressAgree} style={styles.button}>
                            <Text style={styles.buttonText}>Agree</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <LoadingOverlay isVisible={this.state.isLoading} />
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
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then(user => {
        //         if (user) {
        //             this.props.dispatch(Actions.setAuthenticateState({ user })).then(() => {
        //                 this.props.dispatch(
        //                     NavigationActions.reset({
        //                         index: 0,
        //                         actions: [NavigationActions.navigate({ routeName: "RegimenInfo" })]
        //                     })
        //                 );
        //             });
        //         } else {
        //             Alert.alert("Error", "The email was already registered.", [{ text: "OK", onPress: () => {} }], { cancelable: true });
        //         }
        //
        //         this.setState({ isLoading: false });
        //     })
        //     .catch(err => {
        //         Alert.alert("Error", err.toString(), [{ text: "OK", onPress: () => {} }], { cancelable: true });
        //         this.setState({ isLoading: false });
        //     });
    };
}

export default connect(state => ({
    navState: state.navState
}))(SignUpScreen);

const styles = StyleSheet.create(
    scaleStyleSheet({
        vgap20: { height: 20 },
        vgap60: { height: 60 },
        vgap70: { height: 70 },
        vgap100: { height: 100 },
        flex: { flex: 1 },
        formLabel: {
            fontFamily: config.GENERIC_FONT,
            fontSize: 24,
            fontWeight: "normal",
            margin: 10
        },
        formInput: {
            margin: 20
        },
        button: { backgroundColor: "#f4f5f9", alignItems: "center", justifyContent: "center", padding: 20 },
        buttonText: {
            fontFamily: config.GENERIC_FONT,
            fontSize: 32,
            fontWeight: "normal",
            color: "#0477ff"
        }
    })
);
