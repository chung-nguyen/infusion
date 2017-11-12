import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import config from "../config";
import md5 from "../utils/md5";
import { scaleStyle } from "../utils/scaleUIStyle";
import * as ActionTypes from "../reducers/actions";

class DataScreen extends React.Component {
    static navigationOptions = {
        title: "Data"
    };

    state = {};

    componentDidMount() {
        this._updateProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._updateProps(nextProps);
    }

    render() {
        return <View />;
    }

    accumulateDailyData(dataList) {
        return {};
    }

    _updateProps(props) {
        var regimenId = props.regimenInfo.id;
        var sideEffect = props.sideEffect[regimenId];
        if (sideEffect) {
            var allData = [];
            for (var day in sideEffect) {
                var dailyData = sideEffect[day];
                allData.push({
                    day,
                    data: this.accumulateDailyData(dailyData)
                });
            }
        } else {
            this.props.dispatch(ActionTypes.fetchFirebaseData("sideEffect", regimenId));
        }
    }
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo,
    sideEffect: state.sideEffect
}))(DataScreen);
