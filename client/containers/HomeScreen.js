import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import config from "../config";
import * as Actions from "../reducers/actions";
import { scaleStyle, scaleStyleSheet } from "../utils/scaleUIStyle";

import LoadingOverlay from "../components/LoadingOverlay";

var IMAGES = {
    signInLogo: require("../assets/images/signInLogo.png")
};

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        isLoading: true
    };

    constructor() {
        super();
    }

    isRegimenInfoFilled() {
        const regimenInfo = this.props.regimenInfo;
        return regimenInfo.id != null && regimenInfo.dayPerInfusion > 0 && regimenInfo.numberOfInfusion > 0 && regimenInfo.startInfusionDate > 0;
    }

    componentDidMount() {
        this._updateProps(this.props);
        this.setState({ isLoading: !this.props.appState.reHydrated });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.appState.reHydrated && nextProps.authenticate !== this.props.authenticate) {
            this._updateProps(nextProps);
        }
    }

    _updateProps(props) {
        if (props.authenticate.user) {
            if (this.isRegimenInfoFilled()) {
                this.props.dispatch(
                    NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: "Main" })]
                    })
                );
            } else {
                this.props.dispatch(
                    NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: "RegimenInfo" })]
                    })
                );
            }                
        }        
    }

    render() {
        return (
            <View style={styles.flex}>
                <View style={styles.vgap20} />
                <View style={styles.logoWrapper}>
                    <Image source={IMAGES.signInLogo} style={styles.logo} resizeMode="contain" />
                </View>
                <View style={styles.vgap70} />
                <View style={styles.titleWrapper}>
                    <Text textAlign="center" style={styles.titleText} numberOfLines={2}>
                        STAY ON TOP OF YOUR CHEMO REGIMEN
                    </Text>
                </View>
                <View style={styles.vgap60} />
                <View style={styles.titleWrapper}>
                    <Text textAlign="center" style={styles.subtitleText} numberOfLines={2}>
                        Track and monitor your side effects wherever, whenever
                    </Text>
                </View>

                <View style={styles.flex} />

                <TouchableOpacity onPress={this.onPressSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.vgap100} />
                <TouchableOpacity onPress={this.onPressLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.vgap70} />

                <LoadingOverlay isVisible={this.state.isLoading} />
            </View>
        );
    }

    onPressLogin = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: "Login" }));
    };

    onPressSignUp = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: "SignUp" }));
    };
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo,
    appState: state.appState,
    authenticate: state.authenticate
}))(HomeScreen);

const styles = StyleSheet.create(
    scaleStyleSheet({
        vgap20: { height: 20 },
        vgap60: { height: 60 },
        vgap70: { height: 70 },
        vgap100: { height: 100 },
        flex: { flex: 1 },
        logoWrapper: { alignItems: "center", justifyContent: "center" },
        logo: { width: 400, height: 400 },
        titleWrapper: { alignItems: "center", justifyContent: "center", paddingHorizontal: 100 },
        titleText: {
            textAlign: "center",
            fontFamily: config.GENERIC_FONT,
            fontSize: 48,
            fontWeight: "bold",
            color: "#5571a2"
        },
        subtitleText: {
            textAlign: "center",
            fontFamily: config.GENERIC_FONT,
            fontSize: 24,
            fontWeight: "normal",
            color: "#5571a2"
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
