import React from "react";
import {Button, Slider, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Divider} from "react-native-elements";
import {scaleStyle, scaleStyleSheet} from "../utils/scaleUIStyle";
import {Calendar} from 'react-native-calendars';
import config from "../config";
import moment from "moment";

class RegimenInfoScreen extends React.Component {
    static navigationOptions = {
        title: "Regimen Information"
    };

    constructor(props) {
        super(props);

        let date = new Date();
        this.state = {
            dayPerInfusion: 0,
            numberOfInfusion: 0,
            startInfusionDate: Math.floor(date.getTime())
        };
    }


    componentDidMount() {
        this._updateProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._updateProps(nextProps);
    }

    convertTimeStampToDate(timestamp, format) {
        return moment(timestamp).format(format);
    }

    render() {
        let markOptions = {};
        markOptions[this.convertTimeStampToDate(this.state.startInfusionDate, 'YYYY-MM-DD')] = {selected: true};

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Text style={styles.formLabelLarge}>
                        Days per infusion cycle:{' '}
                        <Text style={[styles.formLabelLarge, {fontFamily: config.GENERIC_FONT_BOLD}]}>
                            {this.state.dayPerInfusion}
                        </Text>
                    </Text>
                    <Slider
                        onValueChange={(value) => this.setState({dayPerInfusion: value})}
                        minimumValue={0}
                        maximumValue={30}
                        step={1}
                    />
                    <Text style={styles.formLabelLarge}>
                        Number of Infusions:{' '}
                        <Text style={[styles.formLabelLarge, {fontFamily: config.GENERIC_FONT_BOLD}]}>
                            {this.state.numberOfInfusion}
                        </Text>
                    </Text>
                    <Slider
                        onValueChange={(value) => this.setState({numberOfInfusion: value})}
                        minimumValue={0}
                        maximumValue={30}
                        step={1}
                    />
                    <Text style={styles.formLabelLarge}>
                        First Infusion:{' '}
                        <Text style={[styles.formLabelLarge, {fontFamily: config.GENERIC_FONT_BOLD, color: '#777'}]}>
                            {this.convertTimeStampToDate(this.state.startInfusionDate, 'YYYY-M-D')}
                        </Text>
                    </Text>
                    <Calendar
                        style={scaleStyle({marginTop: 8})}
                        markedDates={markOptions}
                        onDayPress={(day) => {
                            this.setState({startInfusionDate: day.timestamp})
                        }}
                    />
                </View>
                <Divider style={scaleStyle({height: 2, backgroundColor: '#555', marginBottom: 8})} />
                <Button
                    onPress={this.onSubmit}
                    title="Done"
                    color="#841584"
                />
            </View>
        );
    }

    onSubmit = () => {
        // TODO: better unique ID generation, but perhaps this is enough
        var regimenData = { ...this.state, id: Date.now().toString() };

        // this.props
        //     .dispatch(ActionTypes.setRegimenInfo(regimenData))
        //     .then(() => {
        //         return this.props.dispatch(
        //             NavigationActions.reset({
        //                 index: 0,
        //                 actions: [NavigationActions.navigate({ routeName: "Main" })]
        //             })
        //         );
        //     })
        //     .catch(err => {
        //         // TODO - show error dialog
        //     });
    };

    _updateProps = props => {
        if (props.regimenInfo.id != null)
            this.setState(props.regimenInfo);
    };
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo
}))(RegimenInfoScreen);

const styles = StyleSheet.create(
    scaleStyleSheet({
        container: {
            flex: 1,
            paddingHorizontal: 16
        },
        formLabelLarge: {
            fontFamily: config.GENERIC_FONT,
            fontSize: 40,
            marginTop: 36
        },
        formInput: {
            margin: 16
        },
        button: {
            backgroundColor: "#f4f5f9",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
        },
        buttonText: {
            fontFamily: config.GENERIC_FONT,
            fontSize: 32,
            color: "#0477ff"
        }
    })
);
