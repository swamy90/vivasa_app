import React from 'react';
import Carousel from 'simple-carousel-react-native';
import { Alert, View, Text, Image, TextInput, FlatList, ScrollView, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import { GiftedChat } from 'react-native-gifted-chat';
// import { Dialogflow_V2 } from 'react-native-dialogflow';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { dialogflowConfig } from '../../../env';
// network 
import FormData from 'form-data';
import { MY_BASE_URL, MY_STORAGE_URL } from '../../global/index';
// favscreen

const BOT_USER = {
    _id: 'macline-b83hg',
    name: 'FAQ Bot',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};

class BoatChatScreen extends React.Component {


    state = {
        messages: [
            {
                _id: 1,
                text: `Hi! I am the bot 🤖 from BusinessDeal.\n\nHow may I help you with today?`,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Linda',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/145/145862.png'
                }
            }
        ]
    };

    // componentDidMount() {
    //     Dialogflow_V2.setConfiguration(
    //         dialogflowConfig.client_email,
    //         dialogflowConfig.private_key,
    //         Dialogflow_V2.LANG_ENGLISH_US,
    //         dialogflowConfig.project_id
    //     );
    // }

    handleGoogleResponse(result) {
        console.log(JSON.stringify(result))
        // let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        // this.sendBotResponse(text);
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        // Dialogflow_V2.requestQuery(
        //     message,
        //     result => this.handleGoogleResponse(result),
        //     error => console.log(error)
        // );
    }

    sendBotResponse(text) {
        let msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date(),
            user: BOT_USER
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    onPressX = () => {
        let self = this;
        console.log('onPress');
        self.props?.navigation.goBack()
    }

    goBackEndTrip = () => {
        Alert.alert(
            'End Conversation',
            'Are you sure, want end the conversation? \nloose all conversation',
            [
                { text: 'Cancel', onPress: () => console.log('exit not') },
                { text: 'OK', onPress: () => this.onPressX() },
            ]
        );
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View style={{ backgroundColor: '#222222', padding: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.goBackEndTrip} style={{ flexDirection: 'row', alignItems: 'center', zIndex: 9999 }}>
                        <Image style={{ alignSelf: 'center', resizeMode: 'contain', width: 20, height: 20, tintColor: '#ffffff' }} source={require('../../assets/images/arrow.png')} />
                        <Text style={{ color: '#ffffff', }}>Back</Text>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', color: '#ffffff', textAlign: 'center', flex: 1, marginLeft: -55 }}>Connect With Us</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <GiftedChat
                            messages={this.state.messages}
                            onSend={messages => this.onSend(messages)}
                            user={{
                                _id: 1
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default BoatChatScreen;