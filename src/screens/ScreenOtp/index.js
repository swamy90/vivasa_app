import React from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { View, Text, SafeAreaView, Image, Dimensions, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import CommonButton from '../../assets/common/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';
import { MY_BASE_URL } from '../../global';
import FormData from 'form-data';
import axios from 'axios';
import { encode } from "base-64";
const CELL_COUNT = 4;
const ScreenOTP = () => {

    var data = new FormData();
    const navigation = useNavigation();
    const otpInput = React.useRef();
    const routes = useRoute();
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

    const onPress = () => {
        setLoading(true)
        setInterval(() => {
            setLoading(false);
            navigation.navigate('CustomerDetailsScreen');
        }, 1500
        );
    }

    const handleComplete = (code) => {
        setValue(code)
        if (code.length === 4) {
            console.log('valid_code', code);
            // setLoading(true);
            // onVarifiedOTP();
        } else {
            console.log('invalid_code', code);
        }
    };

    // This is only needed once to get the Android Signature key for SMS body
    const handleOnAndroidSignature = (code) => {
        console.log('Android Signature Key for SMS body:', code);
    };

    const onVarifiedOTP = async () => {
        setLoading(true);
        data.append('email', Email)
        data.append('password', Password)
        const URLs = MY_BASE_URL + "api/login";
        const response = await fetch(URLs, {
            method: 'post',
            body: data
        });
        const posts = await response.json();
        console.log(JSON.stringify(posts));
        if (posts.status === true) {
            Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: 'Login Successfully'
            });
            Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: 'Login Successfully'
            });

            Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: 'Login Successfully'
            }); Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: 'Login Successfully'
            });
            Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: 'Login Successfully'
            });
            Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: 'Login Successfully'
            });
            Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: 'Login Successfully'
            });
            saveDetailToAsync(posts);
        } else {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Error Message',
                text2: 'Please Enter Valid Mobile Number!'
            });
        }
    }

    const saveDetailToAsync = async (data) => {
        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem('@storage_Key', jsonValue);
            console.log('Saved Details');
            setLoading(false);
            navigation.navigate('BottomNavigation');
        } catch (e) {
            // saving error
            console.log('Saved Details', JSON.stringify(e));
        }
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView style={{ flexDirection: 'column', backgroundColor: '#eff4fa', height: '100%' }}>
                <View style={{
                    height: Dimensions.get('screen').height / 1.9, backgroundColor: '#8ce68c', borderBottomLeftRadius: 45, borderBottomRightRadius: 45, marginBottom: 20, shadowColor: '#b4b4b4',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5, // 26july / 
                }}>
                    <View style={{}}>
                        <Image source={require('../../assets/images/splash-s-logo.png')} style={{ height: 150, width: 120, resizeMode: 'contain', marginTop: -30, marginRight: 15, alignSelf: "flex-end" }} />
                    </View>
                    <View style={{ paddingLeft: 10, width: '90%' }}>
                        <Text style={{ fontSize: 25, textTransform: 'uppercase', fontWeight: '700', lineHeight: 30, marginBottom: 5, letterSpacing: 1.5 }}>guaranteed lowest price,</Text>
                        <Text style={{ fontSize: 18, textTransform: 'uppercase', lineHeight: 25 }}>compare and then buy from us. we promised to bring 40% saving on your monthly budget</Text>
                    </View>
                    <View style={{ alignSelf: 'center', marginTop: 30 }}>
                        <Image style={{ width: 150, height: 150, resizeMode: 'contain' }} source={require('../../assets/images/s-img4.png')} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', paddingLeft: 0 }}>
                    <View style={{ alignSelf: 'center', paddingBottom: 10, width: '93%', marginBottom: 50 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 5, }} source={require('../../assets/images/arrow.png')} />
                            <Text style={{ textTransform: 'capitalize', fontSize: 18, }}>Login Here</Text>
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
                                <TextInput maxLength={30} onChangeText={(text) => setEmail(text)} style={{ flex: 1, padding: 20 }} keyboardType={'email-address'} placeholder='Enter Email' />
                            </View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                height: 55,
                            }}>
                                <TextInput maxLength={20} onChangeText={(text) => setPassword(text)} style={{ flex: 1, padding: 20 }} secureTextEntry={true} placeholder='Enter password' />
                            </View>
                        </View>
                    </View>
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

export default ScreenOTP;