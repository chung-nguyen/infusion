import React from 'react';
import {UIManager, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {AppLoading, Font} from 'expo';
import AppWithNavigationState from './app/navigators/AppNavigator';
import store from './app/stores/configureStore';
import config from './app/config';
import {initializeFirebase} from './app/services/firebase-service';

export default class App extends React.Component {
    state = {isReady: false};

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        initializeFirebase();
    }

    async _loadAssetsAsync() {
        await Promise.all([
            Font.loadAsync({
                [config.GENERIC_FONT]: require('./app/assets/fonts/MyriadPro-Regular.otf'),
                [config.GENERIC_FONT_BOLD]: require('./app/assets/fonts/MyriadPro-Bold.otf')
            })
        ]);
    }

    render() {
        if (this.state.isReady) {
            return (
                <Provider store={store}>
                    <AppWithNavigationState/>
                </Provider>
            );
        } else {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
    }
}