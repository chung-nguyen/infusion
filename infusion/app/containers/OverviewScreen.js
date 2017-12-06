import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";
import {LinearGradient} from "expo";
import {Divider} from "react-native-elements";
import {scaleStyle} from "../utils/scaleUIStyle";
import config from "../config";
import moment from "moment";

class OverviewScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {};

    componentDidMount() {}

    convertTimeStampToDateString(regimenInfo) {
        const {startInfusionDate} = regimenInfo;

        return moment(startInfusionDate).format('dddd, MMMM DD, YYYY');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={scaleStyle({flex: 1, margin: 16})}>
                    <View
                        style={scaleStyle({
                            padding: 24,
                            elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: {width: 2, height: 2},
                            shadowOpacity: 0.2,
                            shadowRadius: 4
                        })}
                    >
                        <Text
                            style={scaleStyle({
                                fontFamily: config.GENERIC_FONT,
                                fontSize: 32,
                                color: '#306bff',
                                marginVertical: 16
                            })}
                        >
                            FIRST INFUSION DATE
                        </Text>
                        <Text
                            style={scaleStyle({fontFamily: config.GENERIC_FONT_BOLD, fontSize: 40})}
                        >
                            {this.convertTimeStampToDateString(this.props.regimenInfo)}
                        </Text>
                        <Divider style={scaleStyle({height: 2, marginTop: 8})}/>
                        <Text
                            style={scaleStyle({
                                fontFamily: config.GENERIC_FONT,
                                fontSize: 28,
                                color: '#306bff',
                                marginTop: 16
                            })}
                        >
                            You have{' '}
                            <Text style={scaleStyle({
                                fontFamily: config.GENERIC_FONT,
                                fontSize: 28,
                                color: '#306bff'
                            })}>
                                11
                            </Text>
                            {' '}infusions in your regimen.
                        </Text>
                    </View>
                    <View
                        style={scaleStyle({
                            marginTop: 24,
                            padding: 24,
                            elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: {width: 2, height: 2},
                            shadowOpacity: 0.2,
                            shadowRadius: 4
                        })}
                    >
                        <Text
                            style={scaleStyle({
                                fontFamily: config.GENERIC_FONT,
                                fontSize: 32,
                                color: '#306bff',
                                marginVertical: 16
                            })}
                        >
                            What to expect with chemotherapy
                        </Text>
                        <Text
                            style={scaleStyle({fontFamily: config.GENERIC_FONT_BOLD, fontSize: 36})}
                        >
                            Chemo is hard. We're here to help you make sense of what your body is going to go through.
                            Click here to learn more about what this app and how it fits into your treatment.
                        </Text>
                    </View>
                    <View
                        style={scaleStyle({
                            marginTop: 24,
                            padding: 24,
                            elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: {width: 2, height: 2},
                            shadowOpacity: 0.2,
                            shadowRadius: 4
                        })}
                    >
                        <Text
                            style={scaleStyle({
                                fontFamily: config.GENERIC_FONT,
                                fontSize: 32,
                                color: '#306bff',
                                marginVertical: 16
                            })}
                        >
                            Before your first infusion
                        </Text>
                        <Text
                            style={scaleStyle({fontFamily: config.GENERIC_FONT_BOLD, fontSize: 36})}
                        >
                            Even before your infusion, start putting in symptoms to get a baseline. This will improve
                            your prediction quality later on.
                        </Text>
                    </View>
                </View>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                >
                    <TouchableOpacity
                        style={{
                            padding: 15,
                            backgroundColor: 'transparent',
                            alignSelf: 'stretch',
                            alignItems: 'center'
                        }}
                        activeOpacity={0.7}
                        onPress={() => this.onPressInputSideEffects()}
                    >
                        <Text
                            style={scaleStyle({
                                textAlign: 'center',
                                fontSize: 40,
                                fontWeight: 'bold',
                                color: '#fff'
                            })}
                        >
                            INPUT SIDE EFECTS
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        );
    }

    onPressInputSideEffects = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: "InputSideEffects" }));
    };
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo
}))(OverviewScreen);
