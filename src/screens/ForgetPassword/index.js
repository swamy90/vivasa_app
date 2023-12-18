import React from 'react';
import { SafeAreaView, View, Dimensions, TextInput, TouchableOpacity, Text, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// common
import { showMessage, hideMessage } from "react-native-flash-message";
import CommonButton from '../../assets/common/index';
import { MY_BASE_URL } from '../../global';
const { width } = Dimensions.get('screen');


class ForgetPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            isLoading: false,
            isArrow: true,
            value: null,
            items: ['Mr.', 'Ms.', 'Mrs.', 'Miss'],
            password: '',
            isVisiblePassowrd: false,
            email: '',
            otp: '',
            otpSendSucess: false,
        }
    }

    onPress = () => {
        var self = this;
        self.setState({ isLoading: true });
        setTimeout(function () {
            // 
            // self.props.navigation.replace('CustomerDetailsScreen');
            if (self.state.email.trim()) {
                self.sendPasswordToEmail();
                // self.setState({ isLoading: false });
                // showMessage({
                //     message: "Password Recover Successfully!",
                //     description: "Check your registered email!",
                //     type: "success",
                // });
            } else {
                self.setState({ isLoading: false });
                showMessage({
                    message: "Please enter valid email",
                    description: "Please enter correct email address",
                    type: "error",
                });
            }
        }, 1000);
    }

    onSubmitOTPPress = () => {
        var self = this;
        console.log(self.state.otp.length)
        if (self.state.otp.trim() || self.state.otp.length > 4) {
            self.onSubmitOTP();
        } else {
            self.setState({ isLoading: false });
            showMessage({
                message: "Please enter valid OTP",
                description: "Please enter 6 digit OTP",
                type: "error",
            });
        }
    }

    onSubmitOTP = async () => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        this.setState({ isLoading: true });
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/verify-otp-forgot-request";
        formData.append("email", this.state.email.toLowerCase());
        formData.append("otp", this.state.otp);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData,
        });
        const submitCustomer = await response.json();
        console.log('onSubmitOTP', submitCustomer);
        if (submitCustomer.status === true) {
            this.setState({ isLoading: false });
            this.props.navigation.navigate('SubmitForgetPasswordScreen', { email: this.state.email.toLowerCase() });
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "success",
            });
        } else {
            this.setState({ isLoading: false });
            showMessage({
                message: "Already added",
                description: submitCustomer?.message,
                type: "danger",
            });
        }
    }

    sendPasswordToEmail = async () => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        this.setState({ isLoading: true });
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/forgot-request";
        formData.append("email", this.state.email.toLowerCase());
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        console.log('sendPasswordToEmail', submitCustomer);
        if (submitCustomer.status === true) {
            this.setState({ isLoading: false });
            this.setState({ otpSendSucess: true })
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "success",
            });
        } else {
            this.setState({ isLoading: false });
            showMessage({
                message: "Already added",
                description: submitCustomer?.message,
                type: "danger",

            });

        }
    }

    render() {
        return (
            <SafeAreaView style={{ padding: 15 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerDetailsScreen')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ alignSelf: 'center', resizeMode: 'contain', width: 20, height: 20 }} source={require('../../assets/images/arrow.png')} />
                    <Text style={{ flex: 1, marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginTop: 180, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 25 }}>Forgot your Password?</Text>
                    <Text style={{ fontSize: 15, marginTop: 10, }}>Enter your email to recover your password</Text>
                </View>
                {this.state.otpSendSucess === false ?
                    <View style={{}}>
                        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 45 }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                height: 55,
                            }}>
                                <TextInput style={{ paddingLeft: 20, flex: 1 }} keyboardType='email-address' placeholder='Email' onChangeText={(text) => this.setState({ email: text })} />
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <CommonButton
                                text='Send'
                                isLoader={this.state.isLoading}
                                isRightIcon={this.state.isArrow}
                                onPress={this.onPress} />
                        </View>
                    </View> :
                    <View>
                        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 45 }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                height: 55,
                            }}>
                                <TextInput maxLength={6} style={{ paddingLeft: 20, flex: 1, textAlign: 'center' }} keyboardType={'numeric'} placeholder='Enter OTP' onChangeText={(text) => this.setState({ otp: text })} />
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <CommonButton
                                text='Continue'
                                isLoader={this.state.isLoading}
                                isRightIcon={this.state.isArrow}
                                onPress={this.onSubmitOTPPress} />
                        </View>
                    </View>
                }
            </SafeAreaView>
        );
    }

};


export default ForgetPasswordScreen;