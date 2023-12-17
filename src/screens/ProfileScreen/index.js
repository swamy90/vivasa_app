import React, { Component, Profiler, BackHandler } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions, Alert, StatusBar, ScrollView, Linking } from 'react-native';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Image_Files_URL, MY_BASE_URL, MY_STORAGE_URL } from '../../global/index';
import { QRCodeView } from "react-native-id-qrcodeview";
import ImagePicker from 'react-native-image-crop-picker';
import RNExitApp from 'react-native-exit-app';
import { version } from '../../../package.json';
import axios from 'axios';

const ProfileScreen = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [isStatus, setStatus] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState('');
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const navigation = useNavigation();
    const routes = useRoute();

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('getProfileData');
            getProfileData();
        });
    }, [false]);

    const getProfileData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log('getProfileDataa', user?.token);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + `api/get_user?user_id=${user?.user?.id}`;
        // formData.append("token", user?.token);
        // formData.append("user", user?.user?.id);
        // const response = await fetch(URLs, {
        //     method: 'GET',
        //     body: formData
        // });
        console.log("in profile", URLs, user?.token, user?.user?.id)
        axios.get(URLs)
            .then((response) => {
                console.log("res in profile", response?.data?.user);
                setName(response?.data?.user?.name)
                setNumber(response?.data?.user?.mobile)
                setEmail(response?.data?.user?.email)

            })
            .catch((err) => {
                console.log("err in profile", err);
            });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('getProfileDataX', JSON.stringify(submitCustomer));

    }

    const openCameraToUpload = async () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
            compressImageQuality: 0.8,
            useFrontCamera: true
        }).then(image => {
            console.log(image?.path);
            uploadProfilePicture(image?.path);
        });
    }

    const uploadProfilePicture = async (image) => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        var formdata = new FormData();
        formdata.append("image", { uri: image, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });
        formdata.append("user_id", user?.user?.id);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(MY_BASE_URL + "api/change-profile-image", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('uploadProfile', result)
                if (result.status) {
                    showMessage({
                        message: 'Congratulations',
                        description: result?.message,
                        type: "success",
                    });
                    getProfileData();
                } else {

                }
            })
            .catch(error => console.log('error', error));
    }

    const loggoutXUser = async () => {
        Alert.alert(
            'Loggout',
            'Are you sure want to loggout',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        loggoutUser();
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );
    }

    const loggoutUser = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            console.log(`Keys: ${keys}`) // Just to see what's going on
            await AsyncStorage.multiRemove(keys);
            // navigation.navigate('SplashScreen');
            showMessage({
                message: "Loggout Successfull!",
                description: "Congratulations, Loggout successfully!",
                type: "success",
            });
            navigation.replace('SplashScreen');
            // RNExitApp.exitApp();
        } catch (e) {
            console.log(e)
        }
        console.log('Done')
    }

    const goToPrivacyCheck = async (url) => {
        try {
            const oldStyle = StatusBar.pushStackEntry({ barStyle: 'dark-content', animated: false });
            // await InAppBrowser.open(url)
            StatusBar.popStackEntry(oldStyle);
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const ComingSoon = () => {
        showMessage({
            message: 'Coming Soon!',
            description: 'Coming Soon',
            type: "alert",
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            {isLoading === true ?
                <ActivityIndicator style={{ alignSelf: 'center', marginTop: Dimensions.get('screen').width / 1 }} color={'#222222'} size={'large'} /> :
                <View style={{marginTop:50,justifyContent:'center'}}>
                    {/* <ImageBackground source={{ uri: Image_Files_URL + profileImage }} style={{ paddingVertical: 70, paddingHorizontal: 40, height: 250, flexDirection: 'row', alignItems: 'center' }} blurRadius={4} resizeMode={'cover'}> */}
                        {/* <View style={{ width: 100, height: 120 }}>
                            <Image style={styles.avatar} source={{ uri: MY_BASE_URL + profileImage }} />
                            <TouchableOpacity onPress={() => openCameraToUpload()} style={{ position: 'absolute', right: -15, bottom: 0, backgroundColor: 'white', borderRadius: 100, padding: 5, zIndex: 999 }}>
                                <Image style={{ tintColor: 'black', width: 15, height: 15, resizeMode: 'contain' }} source={require('../../assets/images/camera.png')} />
                            </TouchableOpacity>
                            <QRCodeView
                                qrCodeValue={"a7f539c30127dbfc548c05f0f72423abda0f568d"}
                                backgroundColor={'#F5F7FB'}
                                style={{ width: 130, height: 130 }}
                                key="a7f539c30127dbfc548c05f0f72423abda0f568d"
                            />
                        </View> */}

                    {/* </ImageBackground> */}
                    <View style={{ flexDirection: 'row',justifyContent:'space-around',marginBottom:20,width:'80%'}}>
                        <View style={{}}>
                            <Image source={require('../../assets/images/defaultpic.png')} style={{ width: Dimensions.get("screen").width - 280, height: Dimensions.get("screen").width - 280, resizeMode: 'contain' }} />
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>{name}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{number}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.list, { display: 'none' }]}
                        onPress={() => navigation.navigate('AddressListScreen')}>
                        <Image
                            style={styles.list_icon}
                            source={require('../../assets/images/home_address.png')} />
                        <Text style={styles.item_text}>Address List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.list}
                        onPress={() => Linking.openURL('http://www.vivasa.co.in/')}>
                        <Image
                            style={styles.list_icon}
                            source={require('../../assets/images/about.png')} />
                        <Text style={styles.item_text}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.list}
                        onPress={() => navigation.navigate('OrderHistoryScreen')}>
                        <Image
                            style={styles.list_icon}
                            source={require('../../assets/images/order_history.png')} />
                        <Text style={styles.item_text}>Order History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.list}
                        onPress={() => Linking.openURL('https://www.vivasa.co.in/privacy-policy')}>
                        <Image
                            style={styles.list_icon}
                            source={require('../../assets/images/privacy_policy.png')} />
                        <Text style={styles.item_text}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.list}
                        onPress={() => ComingSoon()}>
                        <Image
                            style={styles.list_icon}
                            source={require('../../assets/images/settings.png')} />
                        <Text style={styles.item_text}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.list}
                        onPress={() => loggoutXUser()}>
                        <Image
                            style={styles.list_icon}
                            source={require('../../assets/images/logout.png')} />
                        <Text style={styles.item_text}>Logout</Text>
                    </TouchableOpacity>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 15, alignSelf: 'center', marginTop: 40 }}>
                        <Text style={{ textAlign: 'center', }}>Version {version}</Text>
                    </View>
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#222222",
        height: 50,
        paddingTop: 18,
        paddingLeft: 20
    },
    headerText: {
        color: '#ffffff',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 16
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "#222222",
        marginBottom: 10,
        alignSelf: 'flex-start',
        elevation: 5
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#4a9832",
    },
    list: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        marginHorizontal: 5
    },
    list_icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 15,
    },
    item_text: {
        fontWeight: 'bold'
    }
});

export default ProfileScreen;