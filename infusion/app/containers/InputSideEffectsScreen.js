import React from "react";
import {connect} from "react-redux";
import {Button, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {Icon} from "react-native-elements";
import {LinearGradient} from "expo";
import {scaleStyle, scaleStyleSheet} from "../utils/scaleUIStyle";
import config, {BACK_PAIN, CONSTIPATION, FATIGUE, NAUSEA, NEUROPATHY, VOMITING} from "../config";
import sideEffects from "../utils/sideEffects";

class InputSideEffectsScreen extends React.Component {
    static navigationOptions = {
        title: "Side Effects"
    };

    state = {
        [FATIGUE]: 0,
        [NAUSEA]: 0,
        [BACK_PAIN]: 0,
        [VOMITING]: 0,
        [CONSTIPATION]: 0,
        [NEUROPATHY]: 0
    };

    renderSideEffectInput(sideEffect) {
        return (
            <View
                style={scaleStyle({
                    margin: 16,
                    paddingVertical: 24,
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
                        margin: 16
                    })}
                >
                    {sideEffect}
                </Text>
                <View
                    style={scaleStyle({flexDirection: 'row'})}
                >
                    {sideEffects[sideEffect].map((i) =>
                        <TouchableOpacity
                            key={i.value}
                            style={scaleStyle({flex: 1, alignItems: 'center'})}
                            onPress={() => this.setState({[sideEffect]: i.value})}
                        >
                            <Text
                                style={scaleStyle({
                                    textAlign: 'center',
                                    fontSize: 20,
                                    paddingHorizontal: 4,
                                    marginBottom: 8
                                })}
                            >
                                {i.value}
                            </Text>
                            {
                                this.state[sideEffect] === i.value ?
                                    <Icon name={'dot-circle-o'} type={'font-awesome'} color={'#306bff'}
                                          size={config.UI_SCALE * 64}/>
                                    :
                                    <Icon name={'circle-o'} type={'font-awesome'} color={'#306bff'}
                                          size={config.UI_SCALE * 64}/>
                            }
                            <Text
                                style={scaleStyle({
                                    textAlign: 'center',
                                    fontSize: 20,
                                    paddingHorizontal: 4,
                                    marginTop: 8
                                })}
                            >
                                {i.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    {this.renderSideEffectInput(FATIGUE)}
                    {this.renderSideEffectInput(NAUSEA)}
                    {this.renderSideEffectInput(BACK_PAIN)}
                    {this.renderSideEffectInput(VOMITING)}
                    {this.renderSideEffectInput(CONSTIPATION)}
                    {this.renderSideEffectInput(NEUROPATHY)}
                </ScrollView>
                <TouchableOpacity onPress={this.onPressLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onSubmit = () => {
        var regimenInfo = this.props.regimenInfo;

        if (regimenInfo.id != null) {
            var timestamp = Date.now();

            // this.props
            //     .dispatch(ActionTypes.setSideEffectData(regimenInfo.id, timestamp, this.state))
            //     .then(() => {
            //         this.props.dispatch(NavigationActions.back());
            //     })
            //     .catch(err => {
            //         // TODO: show error dialog
            //     });

            this.props.dispatch(setFirebaseData('sideEffect', regimenData, () => {
                this.props.dispatch(
                    NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: "Main" })]
                    })
                );
            }, (error) => {
                Alert.alert(
                    "Error",
                    error,
                    [
                        { text: "OK", onPress: () => {} }
                    ],
                    {cancelable: true}
                );
            }))

        } else {
            this.props.dispatch(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "RegimenInfo" })]
                })
            );
        }
    };
}

export default connect(state => ({
    navState: state.navState,
    regimenInfo: state.regimenInfo,
    sideEffect: state.sideEffect
}))(InputSideEffectsScreen);

const styles = StyleSheet.create(
    scaleStyleSheet({
        button: { backgroundColor: "#f4f5f9", alignItems: "center", justifyContent: "center", padding: 20 },
        buttonText: {
            fontFamily: config.GENERIC_FONT,
            fontSize: 32,
            fontWeight: "normal",
            color: "#0477ff"
        }
    })
);