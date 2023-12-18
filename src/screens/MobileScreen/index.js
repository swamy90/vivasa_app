import React from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage, hideMessage } from "react-native-flash-message";
import DropDownPicker from 'react-native-dropdown-picker';
import CommonButton from '../../assets/common/index';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { MY_BASE_URL } from '../../global/index';
import FormData from 'form-data';
import axios from 'axios';
import { encode } from "base-64";

var data = new FormData();

const MobileScreen = () => {

    const navigation = useNavigation();
    const [isSecure, setSecure] = React.useState(true);
    const [isLogin, setLogin] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [isArrow, setArrow] = React.useState(false);
    const [Name, setName] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [reg] = React.useState(/^[0]?[789]\d{9}$/);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        { label: 'user', value: 'User' },
        { label: 'store', value: 'Store' }
    ]);


    const onPress = () => {
        if (!mobile.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error Message',
                text2: 'Please Enter Number!'
            });
        } else if (reg.test(mobile) === false) {
            Toast.show({
                type: 'error',
                text1: 'Error Message',
                text2: 'Please Enter Valid Mobile Number!'
            });
        } else {
            setLoading(true);
            onPressLogin();
        }
    }


    const onPressLogin = async () => {
        data.append('name', Name)
        data.append('email', Email)
        data.append('mobile', mobile)
        data.append('password', Password)
        // data.append('user_type', value)
        const URLs = MY_BASE_URL + "api/register";
        console.log(URLs, data);
        const response = await fetch(URLs, {
            method: 'POST',
            body: data
        });
        const posts = await response.json();
        console.log('params:', data);
        console.log('response:x', posts);
        if (posts.status === true) {
            setLoading(false);
            showMessage({
                message: 'success',
                description: 'Congratulations',
                type: "success",
            });
            navigation.replace('CustomerDetailsScreen', mobile);
        } else {
            let description = posts?.error?.email || '';
            if (posts?.error?.mobile) {
                description += ' ' + posts?.error?.mobile ;
            }
            showMessage({
                message: "Invalid Login Details",
                description: description,
                type: "warning",
            });
            setLoading(false);
        }
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
                    <View style={{ alignSelf: 'center', paddingBottom: 10, width: '93%', }}>
                        <Text style={{ textTransform: 'capitalize', fontSize: 18, color: '#b4b4b4' }}>Lets get your started</Text>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{
                                    flex: 1 / 2, backgroundColor: 'white', height: 55, marginTop: 5, marginBottom: 5, borderRadius: 10, shadowColor: '#b4b4b4',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    marginRight: 10
                                }}>
                                    <TextInput maxLength={20} onChangeText={(number) => setName(number)} style={{ width: '100%', flex: 1, paddingLeft: 15, color: '#000' }} placeholderTextColor={'#000'} placeholder='Enter Name' keyboardType='default' returnKeyType='done' />
                                </View>
                                <View style={{
                                    flex: 1 / 2, backgroundColor: 'white', height: 55, marginTop: 5, marginBottom: 5, borderRadius: 10, shadowColor: '#b4b4b4',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    elevation: 5,
                                }}>
                                    <TextInput maxLength={10} onChangeText={(number) => setMobile(number)} style={{ width: '100%', flex: 1, paddingLeft: 15, color: '#000' }} placeholderTextColor={'#000'} placeholder='Enter Mobile' keyboardType='numeric' returnKeyType='done' />
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: 55, marginTop: 10, marginBottom: 5, borderRadius: 10, shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                            }}>
                                <TextInput maxLength={40} onChangeText={(number) => setEmail(number.toLowerCase())} style={{ width: '100%', flex: 1, paddingLeft: 15, color: '#000' }} placeholderTextColor={'#000'} placeholder='Enter Email' keyboardType='email-address' returnKeyType='done' />
                            </View>
                            {/* <DropDownPicker
                                style={{ marginTop: 10 }}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                            /> */}
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: 55, marginTop: 10, marginBottom: 5, borderRadius: 10, shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                            }}>
                                <TextInput maxLength={20} onChangeText={(number) => setPassword(number)} style={{ width: '100%', flex: 1, paddingLeft: 15, color: '#000' }} placeholderTextColor={'#000'} secureTextEntry={isSecure} placeholder='Enter Password' keyboardType='default' returnKeyType='done' />
                                <TouchableOpacity style={{ zIndex: 999, marginRight: 10 }} onPress={() => setSecure(!isSecure)}>
                                    <Image style={{}} source={isSecure ? require('../../assets/images/hidden.png') : require('../../assets/images/eye.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{}}>Password must be at least 6 characters.</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={{ paddingVertical: 7, alignSelf: 'flex-end', marginRight: 5, marginBottom: 15 }} onPress={() => navigation.replace('CustomerDetailsScreen')}>
                                <Text style={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#000000', fontSize: 16 }}>Login Here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <CommonButton
                        text='Register'
                        isLoader={isLoading}
                        isRightIcon={isArrow}
                        onPress={() => onPress()}
                    />
                </View>
            </ScrollView>
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

export default MobileScreen;