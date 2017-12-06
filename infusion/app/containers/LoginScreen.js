import React from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {scaleStyleSheet} from "../utils/scaleUIStyle";
import {verifyAuthenticateState} from "../stores/authenticate/actions";
import {NavigationActions} from "react-navigation";
import config from "../config";
import md5 from "../utils/md5";
import LoadingOverlay from "../components/LoadingOverlay";
import * as firebase from 'firebase';

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: "Login"
    };

    state = {
        email: "tiendv.52@gmail.com",
        password: "111111",
        isLoading: false
    };

    componentDidMount() {}

    render() {
        return (
            <View style={styles.flex}>
                <View style={styles.vgap20} />

                <Text style={styles.formLabel}>Email/Account</Text>
                <TextInput onChangeText={text => this.setState({ email: text })} value={this.state.email} style={styles.formInput} />

                <View style={styles.vgap20} />

                <Text style={styles.formLabel}>Password:</Text>
                <TextInput
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry={true}
                    value={this.state.password}
                    style={styles.formInput}
                />

                <View style={styles.flex} />

                <TouchableOpacity onPress={this.onPressLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <LoadingOverlay isVisible={this.state.isLoading} />
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
                    this.props.dispatch(verifyAuthenticateState({user}));
                } else {
                    Alert.alert("Error", "Wrong email or password !", [{
                        text: "OK", onPress: () => {
                        }
                    }], {cancelable: true});
                }

                this.setState({isLoading: false});
            })
            .catch(err => {
                Alert.alert("Error", err.toString(), [{
                    text: "OK", onPress: () => {
                    }
                }], {cancelable: true});
                this.setState({isLoading: false});
            });
    };
}

export default connect(state => ({
    navState: state.navState
}))(LoginScreen);

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
