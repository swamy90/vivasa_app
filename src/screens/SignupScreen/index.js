import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../../assets/common/index';
import Toast from 'react-native-toast-message';
import FormData from 'form-data';
import { encode } from "base-64";

var data = new FormData();

const SignupScreen = () => {

    const navigation = useNavigation();
    const [isLogin, setLoading] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isArrow, setArrow] = React.useState(true)
    const [value, setValue] = React.useState(null)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [items, setItem] = React.useState(['Mr.', 'Ms.', 'Mrs.', 'Miss'])
    const [isVisiblePassowrd, setIsVisiblePassword] = React.useState(true)
    const reg = /^[0]?[789]\d{9}$/;


    const onPress = () => {
        setIsLoading(false);
        setTimeout(function () {
            if (validation()) {
                setIsLoading(true);
                submitLogin();
            }
            // navigation.replace('CustomerDetailsScreen');
        }, 100);
    }

    const validation = () => {
        if (!email.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error Email',
                text2: 'Please Enter Email!'
            });
            return false
        }
        if (reg.test(email) !== true) {
            Toast.show({
                type: 'error',
                text1: 'Error Mobile',
                text2: 'Please Enter Valid Mobile!'
            });
            return false
        }
        if (!password.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error Password',
                text2: 'Please Enter Valid Password!'
            });
            return false
        }
        return true
    }

    const submitLogin = async () => {
        const userName = 'GgrDrmStl';
        const userPassword = 'G@4321@qwer';
        data.append('mobile', email)
        data.append('password', password)
        data.append('deviceID', 'fagafgafgafga')
        const URLs = "https://www.digi-markets.com/ggrocer/login-user-password";
        const response = await fetch(URLs, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Basic ' + encode(userName + ":" + userPassword),
            }),
            body: data
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', submitCustomer);
        if (submitCustomer.status === true) {
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: 'Congratulation',
                text2: 'Login Successfully'
            });
            navigation.replace('HomeBottomNavigation');
        } else {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Opps!',
                text2: 'Something went wrong. try again!'
            });
        }
    }

    const forgotPassword = () => {
        navigation.replace('ForgetPasswordScreen');
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ padding: 10, backgroundColor: 'rgb(241,244,249)', height: '100%' }}>
                <TouchableOpacity style={{ position: 'absolute', right: 15, top: 15 }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/cross.png')} />
                </TouchableOpacity>
                <View style={{ alignSelf: 'center' }}>
                    <Image style={{ width: 130, height: 130, resizeMode: 'contain' }} source={require('../../assets/images/login-log.png')} />
                </View>
                <View style={{ paddingTop: 10, marginBottom: 60 }}>
                    <Text style={{ fontSize: 23, fontWeight: '300' }}>Log In</Text>
                </View>
                <View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ marginBottom: 10, fontWeight: '300' }}>Mobile</Text>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setEmail(text)} style={{ paddingLeft: 20,color:'#000' }} placeholder='Enter the email' />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ marginBottom: 10, fontWeight: '300',color:'#000' }}>Password</Text>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setPassword(text)} style={{ flex: 1, padding: 20,color:'#000' }} secureTextEntry={isVisiblePassowrd} placeholder='Enter the password' />
                            <TouchableOpacity style={{}} onPress={() => setIsVisiblePassword(!isVisiblePassowrd)}>
                                <Image style={{ marginRight: 20, tintColor: isVisiblePassowrd === true ? 'black' : 'grey', width: 20, height: 20, resizeMode: 'contain' }} source={require('../../assets/images/password_hide.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => forgotPassword()} style={{ padding: 20, marginTop: 5, marginBottom: 19 }}>
                        <Text style={{ textAlign: 'right', fontSize: 12, color: 'green', fontWeight: '300', letterSpacing: .5 }}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <CommonButton
                        text='Save'
                        isLoader={isLoading}
                        isRightIcon={isArrow}
                        onPress={() => onPress()} />
                </View>
                <View style={{ alignSelf: 'center', marginTop: 25 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ textAlign: 'center', color: 'grey', marginRight: 5 }}>Don`t have an account?</Text>
                        <TouchableOpacity style={{}} onPress={this.onPress}>
                            <Text style={{ fontWeight: '600', fontSize: 15 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignSelf: 'center', marginTop: 35 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                        <View style={{
                            backgroundColor: '#FFFFFF', padding: 15, marginRight: 10, borderRadius: 8, shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                        }}>
                            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/fb.png')} />
                        </View>
                        <View style={{
                            backgroundColor: '#FFFFFF', padding: 15, marginRight: 10, borderRadius: 8, shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                        }}>
                            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/gmail.png')} />
                        </View>
                        <View style={{
                            backgroundColor: '#FFFFFF', padding: 15, marginRight: 10, borderRadius: 8, shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                        }}>
                            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/insta.png')} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
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

export default SignupScreen;