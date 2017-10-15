import React from "react";
import { Text } from "react-native";
import { NavigationActions } from "react-navigation";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        // TODO: Initialization goes here
        // ...

        setTimeout(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Login" })]
            });
            this.props.navigation.dispatch(resetAction);
        }, 3000);
    }

    render() {
        return <Text>This is Home Screen</Text>;
    }
}
