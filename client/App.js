import React, { Component } from "react";
import { Platform, BackAndroid, AsyncStorage } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";

import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { Provider, connect } from "react-redux";
import Spinner from "react-native-spinkit";

import reducers from "./reducers";
import middleware from "./middleware";

import AppNavigator from "./AppNavigator";

// Initialize the store
const store = createStore(reducers, undefined, compose(middleware));
persistStore(store, { blacklist: ["authenticate", "navState"], storage: AsyncStorage });

class App extends React.Component {    
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

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onHardwareBackPress);
        }
    }

    onHardwareBackPress = () => {
        this.props.dispatch(NavigationActions.back({}));
        return true;
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
