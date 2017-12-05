import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import {fetchFirebaseData} from '../stores/actions';

class DataScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {};

    componentDidMount() {
        this._updateProps(this.props, true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sideEffect != this.props.sideEffect) {
            this._updateProps(nextProps, false);
        }
    }

    render() {
        return <View />;
    }

    accumulateDailyData(dataList) {
        return {};
    }

    _updateProps(props, fetchSideEffect) {
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
            if (fetchSideEffect) {
                this.props.dispatch(fetchFirebaseData("sideEffect", regimenId));
            }
        }
    }
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo,
    sideEffect: state.sideEffect
}))(DataScreen);
