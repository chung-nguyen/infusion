import React, { Component } from "react";
import { Platform, AsyncStorage } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { Provider, connect } from "react-redux";

import reducers from "./reducers";
import * as Actions from "./reducers/actions";
import middleware from "./middleware";

import AppNavigator from "./AppNavigator";

const store = createStore(reducers, undefined, compose(middleware, autoRehydrate()));

persistStore(store, { blacklist: ["authenticate"], storage: AsyncStorage });

class App extends React.Component {
    constructor() {
        super();
        this.unsubscriber = null;
    }

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
            this.props
                .dispatch(Actions.setAuthenticateState({ user }))
                .then(() => {
                    this.props.dispatch(
                        NavigationActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: "Dummy" })]
                        })
                    );
                })
                .catch(err => {
                    //TODO
                });
        });
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navState
                })}
            />
        );
    }
}

const AppWithNavigationState = connect(state => ({
    navState: state.navState
}))(App);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
