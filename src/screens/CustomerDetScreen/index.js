import React from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { View, Text, SafeAreaView, Image, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { getFCMToken, } from '../../../notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import CommonButton from '../../assets/common/index';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';
import { MY_BASE_URL } from '../../global';
import FormData from 'form-data';

const CELL_COUNT = 4;

const CustomerDetailsScreen = () => {

    var data = new FormData();
    const navigation = useNavigation();
    const otpInput = React.useRef();
    const routes = useRoute();
    const [isSecure, setSecure] = React.useState(true);
    const [isLogin, setLogin] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [isArrow, setArrow] = React.useState(false);
    const [OtpCode, setOtpCode] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [Email, setEmail] = React.useState('');
    // otp
    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useFocusEffect(
        React.useCallback(async () => {
            console.log('tokenKeyX', 'focused')
            // whatever
            const value = await AsyncStorage.getItem('@tokenKey');
            console.log('tokenKeyX', value);
            setOtpCode(value);
        }, [])
    );

    const GoLogin = () => {
        navigation.navigate('BottomHomeScreen');
        // var self = this;
        // this.setState({ isLoading: true });
        // setTimeout(function () {
        //     self.setState({ isLoading: false });
        //     self.props.navigation.replace('LoginScreen');
        // }, 1000); Administrator@1996
    }

    const onVarifiedOTP = async () => {
        const value = await AsyncStorage.getItem('@tokenKey');
        setLoading(true);
        data.append('email', Email.toLowerCase())
        data.append('password', Password)
        data.append('token', value)
        const URLs = MY_BASE_URL + "api/login";
        const response = await fetch(URLs, {
            method: 'post',
            body: data
        });
        console.log('onVarifiedOTP', JSON.stringify(data));
        const posts = await response.json();
        console.log('onVarifiedOTP', JSON.stringify(posts));
        if (posts.status === true) {
            saveDetailToAsync(posts);
            showMessage({
                message: "Login Successfull!",
                description: "Congratulations, Login successfully!",
                type: "success",
            });
        } else {
            setLoading(false);
            showMessage({
                message: "Invalid Login Details",
                description: posts?.message,
                type: "warning",
            });
        }
    }

    const saveDetailToAsync = async (data) => {
        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem('@storage_Key', jsonValue);
            console.log('Saved Details');
            setLoading(false);
            if (data.user.user_type === 'Store') {
                navigation.replace('HomeBottomNavigation');
            } else {
                navigation.replace('HomeBottomNavigation');
            }
        } catch (e) {
            // saving error
            console.log('Saved Details', JSON.stringify(e));
        }
    }

    const restorePassword = () => {
        showMessage({
            message: "Password Recover Successfully!",
            description: "Check your registered email!",
            type: "success",
        });
        Toast.show({
            type: 'success',
            text1: 'Password Recover Successfully',
            text2: 'Check your registered email!',
        });
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={{ flexDirection: 'column', backgroundColor: '#eff4fa', height: '100%' }}>
                <View style={{
                    height: Dimensions.get('screen').height / 1.9, backgroundColor: '#222222', borderBottomLeftRadius: 45, borderBottomRightRadius: 45, marginBottom: 20, shadowColor: '#b4b4b4',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    <View style={{ marginBottom: 15 }}>
                        <Image source={require('../../assets/images/s-img4.png')} style={{ height: 100, width: 100, resizeMode: 'contain', marginTop: 20, marginRight: 15, alignSelf: "flex-end" }} />
                    </View>
                    <View style={{ paddingLeft: 10, width: '90%' }}>
                        <Text style={{ fontSize: 25, textTransform: 'uppercase', fontWeight: '700', lineHeight: 30, marginBottom: 5, letterSpacing: 1., color: '#FFFFFF' }}>Vitrag Cloth Distributor</Text>
                        <Text style={{ fontSize: 18, textTransform: 'uppercase', lineHeight: 25, color: '#FFFFFF' }}>VIVASA is a premium brand that caters to the high fashion lifestyle of women.</Text>
                    </View>
                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Image style={{ width: 140, height: 140, resizeMode: 'contain' }} source={require('../../assets/images/vivasa_logo.png')} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', paddingLeft: 0 }}>
                    <ScrollView style={{ alignSelf: 'center', paddingBottom: 10, width: '93%', marginBottom: 55 }}>
                        <View>
                            <Text style={{ textTransform: 'capitalize', fontSize: 18, color: '#b4b4b4', marginLeft: 2 }}>Lets get your started</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                height: 55,
                                marginBottom: 10,
                            }}>
                                <TextInput maxLength={30} onChangeText={(text) => setEmail(text.toLowerCase())} style={{ flex: 1, padding: 20, color: '#000' }} placeholderTextColor={'#000'} keyboardType={'email-address'} placeholder='Enter Email' />
                            </View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                height: 55,
                            }}>
                                <TextInput maxLength={20} onChangeText={(text) => setPassword(text)} style={{ flex: 1, padding: 20, color: '#000' }} placeholderTextColor={'#000'} secureTextEntry={isSecure} placeholder='Enter password' />
                                <TouchableOpacity style={{ zIndex: 999, marginRight: 10 }} onPress={() => setSecure(!isSecure)}>
                                    <Image style={{}} source={isSecure ? require('../../assets/images/hidden.png') : require('../../assets/images/eye.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => navigation.replace('MobileScreen')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 5, }} source={require('../../assets/images/arrow.png')} />
                                    <Text style={{ textTransform: 'capitalize', fontSize: 18, fontWeight: 'bold' }}>Signup Here</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => restorePassword()} style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: 'red', borderBottomWidth: 1 }}>
                                <Text style={{ textTransform: 'capitalize', fontSize: 13, fontWeight: 'bold', color: 'red' }}>forgot password</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <CommonButton
                        text='Login Here'
                        isLoader={isLoading}
                        isRightIcon={isArrow}
                        onPress={() => onVarifiedOTP()} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },
    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        marginRight: 15,
        borderRadius: 12
    },
    focusCell: {
        borderColor: '#000',
    },
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
    },
    resendText: {
        color: 'green',
        fontWeight: '600'
    }
});

export default CustomerDetailsScreen;