import React from 'react';
import { SafeAreaView, View, Dimensions, TextInput, TouchableOpacity, Text, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// common
import { showMessage, hideMessage } from "react-native-flash-message";
import CommonButton from '../../assets/common/index';
import { MY_BASE_URL } from '../../global';
const { width } = Dimensions.get('screen');


class SubmitForgetPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            isLoading: false,
            isArrow: true,
            value: '',
            items: ['Mr.', 'Ms.', 'Mrs.', 'Miss'],
            password: '',
            repassword: '',
            isVisiblePassowrd: false,
            email: this.props?.route?.params?.email,
            otp: '',
            otpSendSucess: false,
        }
        console.warn('------------------------>',JSON.stringify(this.props?.route?.params?.email));
    }

    onPress = () => {
        var self = this;
        self.setState({ isLoading: true });
        console.log(self.state.password + '  -> ' + self.state.value)
        setTimeout(function () {
            // 
            // self.props.navigation.replace('CustomerDetailsScreen');
            if (self.state.password.length > 5 || self.state.value.length > 5) {
                if (self.state.password.match(self.state.value)) {
                    self.sendPasswordToEmail();
                } else {
                    self.setState({ isLoading: false });
                    showMessage({
                        message: "Please enter valid password",
                        description: "Your password not match, Please enter correct passowrd!",
                        type: "danger",
                    });
                }
            } else {
                self.setState({ isLoading: false });
                showMessage({
                    message: "Password length must be grater then 5",
                    description: "Your Password length must be grater then 5",
                    type: "danger",
                });
            }
        }, 1000);
    }

    onSubmitOTPPress = () => {
        var self = this;
        if (self.state.otp.trim() || self.state.otp.length > 4) {
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
    }

    onSubmitOTP = async () => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        this.setState({ isLoading: true });
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/verify-otp-forgot-request";
        formData.append("email", this.state.email);
        formData.append("otp", this.state.otp);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        console.log('submitCustomer in addProductInFavList', submitCustomer);
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

    sendPasswordToEmail = async () => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        this.setState({ isLoading: true });
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/finally-forgot-password-request";
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("confirm_password", this.state.value);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        console.log('submitCustomer in addProductInFavList', JSON.stringify(formData));
        const submitCustomer = await response.json();
        console.log('submitCustomer in addProductInFavList', submitCustomer);
        if (submitCustomer.status === true) {
            this.setState({ isLoading: false });
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "success",
            });
            this.props.navigation.replace('CustomerDetailsScreen');
        } else {
            this.setState({ isLoading: false });
            showMessage({
                message: "Something went wrong",
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
                    <Text style={{ fontSize: 25 }}>Create New Password</Text>
                    <Text style={{ fontSize: 15, marginTop: 10, }}>Enter your new password, Do not repeat old password.</Text>
                </View>
                <View style={{}}>
                    <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 45 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            height: 55,
                            marginBottom: 20
                        }}>
                            <TextInput secureTextEntry={true} style={{ paddingLeft: 20, flex: 1 }} placeholder='Password' onChangeText={(text) => this.setState({ password: text })} />
                        </View>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            height: 55,
                        }}>
                            <TextInput secureTextEntry={true} style={{ paddingLeft: 20, flex: 1 }} placeholder='Confirm Password' onChangeText={(text) => this.setState({ value: text })} />
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', }}>
                        <CommonButton
                            text='Submit'
                            isLoader={this.state.isLoading}
                            isRightIcon={this.state.isArrow}
                            onPress={this.onPress} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

};


export default SubmitForgetPasswordScreen;