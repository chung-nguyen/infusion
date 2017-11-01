import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import * as Actions from "../reducers/actions";

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.unsubscriber = null;
    }

    isRegimenInfoFilled() {
        const regimenInfo = this.props.regimenInfo;
        return regimenInfo.dayPerInfusion > 0 && regimenInfo.numberOfInfusion > 0 && regimenInfo.startInfusionDate > 0;
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.appState.rehydrated) {
            this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.props
                        .dispatch(Actions.setAuthenticateState({ user }))
                        .then(() => {
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
                        })
                        .catch(err => {
                            // TODO: show error message
    
                            this.goToLogin();
                        });
                } else {
                    this.goToLogin();
                }
            });
        }
    }

    goToLogin() {
        this.props.navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Login" })]
            })
        );
    }

    render() {
        return <Text>This is Home Screen</Text>;
    }
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo,
    appState: state.appState
}))(HomeScreen);
