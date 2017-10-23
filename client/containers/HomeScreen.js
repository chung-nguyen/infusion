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

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props
                    .dispatch(Actions.setAuthenticateState({ user }))
                    .then(() => {
                        this.props.dispatch(
                            NavigationActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: "Main" })]
                            })
                        );
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

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
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
    navState: state.navState
}))(HomeScreen);
