import React from "react";
import { Text } from "react-native";
import { NavigationActions } from "react-navigation";

export default class DummyScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return <Text>DUMMY</Text>;
    }
}
