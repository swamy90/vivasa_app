import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation, useRoute } from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import { showMessage, hideMessage } from "react-native-flash-message";
import { requestLocationPermission, MY_BASE_URL } from '../../global/index';
import RazorpayCheckout from 'react-native-razorpay';
import CommonButton from '../../assets/common/index';
import FormData from 'form-data';

var data = new FormData();

const NewAddressScreen = () => {

    const navigation = useNavigation();
    const routes = useRoute();
    const [isSearching, setLoading] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isLocation, setLocation] = React.useState(false);
    const [FirstName, setFirstName] = React.useState('')
    const [LastName, setLastName] = React.useState('')
    const [MobileNumber, setMobileNumber] = React.useState('')
    const [AmountPaymnet, setAmountPaymnet] = React.useState(0)
    const [FullAddress, setFullAddress] = React.useState('')
    const [isOrderLoading, setOrderIsLoading] = React.useState(false);
    const [State, setState] = React.useState('')
    const [City, setCity] = React.useState('')
    const [Pincode, setPincode] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [Remark, setRemark] = React.useState('')
    const reg = /^[0]?[789]\d{9}$/;

    React.useEffect(async () => {
        navigation.addListener('focus', async () => {
            // call function
            console.log('NewAddressScreen', JSON.stringify(routes.params));
            setAmountPaymnet(routes?.params?.amount);
            // getCurrentLication();
        });
    }, [false]);

    const getCurrentLication = async () => {
        setLoading(true)
        await requestLocationPermission();
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                setLocation(location);
                setLoading(false);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
                setLocation(message)
                setLoading(false);
            })
    }

    const onPress = () => {
        console.log('onPress');
        if (FirstName === '') {
            showMessage({
                message: 'First Name ',
                description: 'Please Enter First Name',
                type: "danger",
            });
        } else if (LastName === '') {
            showMessage({
                message: 'Last Name ',
                description: 'Please Enter Last Name',
                type: "danger",
            });
        } else if (MobileNumber === '') {
            showMessage({
                message: 'Mobile Number ',
                description: 'Please Enter Mobile Number',
                type: "danger",
            });
        } else if (reg.test(MobileNumber) === false) {
            showMessage({
                message: 'Mobile Number ',
                description: 'Please Enter Valid Mobile Number',
                type: "danger",
            });
        } else if (FullAddress === '') {
            showMessage({
                message: 'Full Address',
                description: 'Please Enter Full Address',
                type: "danger",
            });
        } else if (State === '') {
            showMessage({
                message: 'State',
                description: 'Please Enter State',
                type: "danger",
            });
        } else if (City === '') {
            showMessage({
                message: 'City',
                description: 'Please Enter City',
                type: "danger",
            });
        } else if (Pincode === '') {
            showMessage({
                message: 'First Name ',
                description: 'Please Enter Pincode',
                type: "danger",
            });
        } else {
            createAddress();
        }
    }


    const createAddress = async () => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('AddProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/place_order";
        formData.append("user_id", user?.user?.id);
        formData.append("first_name", FirstName);
        formData.append("last_name", LastName);
        formData.append("mobile", MobileNumber);
        formData.append("address", FullAddress);
        formData.append("state", State);
        formData.append("city", City);
        formData.append("pincode", Pincode);
        formData.append("email", Pincode);
        // formData.append("latitude", isLocation?.latitude);
        // formData.append("longitude", isLocation?.longitude);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const address = await response.json();
        console.log('address', JSON.stringify(address));
        setIsLoading(false);
        if (address.status) {
            showMessage({
                message: 'Congratulations',
                description: address?.msg,
                type: "success",
            });
            payMeMoney(address?.razorpayOrderId);
            // navigation.navigate('PayScreen', { address });
        } else {
            showMessage({
                message: 'Something went wrong!',
                description: address?.msg,
                type: "error",
            });
        }
    }

    const placeOrder = async (data) => {
        console.log(data?.id);
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('placeOrder', user?.user?.id);
        setOrderIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/order-place";
        formData.append("user_id", user?.user?.id);
        formData.append("address_id", data?.id);
        formData.append("promocode", promoCode);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData,
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', JSON.stringify(submitCustomer));
        if (submitCustomer?.error) {
            Toast.show({
                type: 'error',
                text1: 'Please select Delivery Address!',
                text2: submitCustomer?.error?.address_id[0]
            });
            setOrderIsLoading(false);
        } else {
            payMeMoney(submitCustomer);
        }
    }

    const payMeMoney = async (params) => {
        var finalAmt = Number(AmountPaymnet) * 100;
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.name);
        console.log('payMeMoney:::->' + finalAmt);
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_live_hMXyVpRSAwlLgg', // Your api key // rzp_test_x8WTYeDwK81gYf  | rzp_test_dNseEkGtpk4abg
            amount: finalAmt,
            order_id: params,
            name: user?.user?.name,
            prefill: {
                email: 'void@razorpay.com',
                contact: '9999999999',
                name: 'Razorpay Software',
            },
            theme: { color: '#222222' },
        };
        console.log('options:::->', JSON.stringify(options));
        RazorpayCheckout.open(options)
            .then(data => {
                // handle success
                // alert(`Success: ` + JSON.stringify(data));
                setOrderIsLoading(false);
                console.log('RazorpayCheckout', 'Success ' + JSON.stringify(data));
                finalPaymentStatusCalls(data, params?.order_number);
            })
            .catch(error => {
                // handle failure
                if (error !== undefined) {
                    console.log('RazorpayCheckout',error?.description);
                    showMessage({
                        message: 'Payment Failure',
                        description: "You may have cancelled the payment or there was a delay in response from the UPI app",
                        type: "error",
                    });
                    setOrderIsLoading(false);
                    // this.props.navigation.replace('FullScreenAlert', 'Error');
                }
                // alert(`Error: ${JSON.stringify(error)}`);
            });
    }

    const finalPaymentStatusCalls = async (params, orderNumber) => {
        setOrderIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/make-payment-success";
        formData.append("rzp_signature", params?.razorpay_signature);
        formData.append("rzp_paymentid", params?.razorpay_payment_id);
        formData.append("rzp_orderid", params?.razorpay_order_id);
        formData.append("order_number", orderNumber);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData,
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', JSON.stringify(submitCustomer));
        if (submitCustomer?.error) {
            Toast.show({
                type: 'error',
                text1: 'Payment Failed!',
                text2: '' + submitCustomer
            });
            setOrderIsLoading(false);
        } else {
            setOrderIsLoading(false);
            navigation.navigate('HomeBottomNavigation');
            Toast.show({
                type: 'success',
                text1: 'Payment Successful!',
                text2: '' + submitCustomer?.message
            });
            // payMeMoney(submitCustomer);
        }
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#FFFFFF', borderRadius: 100, padding: 5, marginRight: 10 }}>
                    <Image style={{ width: 12, height: 12, resizeMode: 'contain' }} source={require('../../assets/images/arrow.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>New Address</Text>
            </View>
            <View style={{ padding: 10, backgroundColor: 'rgb(241,244,249)', height: '100%' }}>
                <View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setFirstName(text)} style={{ flex: 1 / 2, paddingLeft: 20, backgroundColor: 'white', marginRight: 10, elevation: 5, borderRadius: 10, }} placeholder='First Name *' value={FirstName} />
                            <TextInput onChangeText={(text) => setLastName(text)} style={{ flex: 1 / 2, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='Last Name *' value={LastName} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput maxLength={10} keyboardType="numeric" onChangeText={(text) => setMobileNumber(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='Mobile *' value={MobileNumber} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setFullAddress(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='Full Address *' value={FullAddress} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setEmail(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='Email *' value={email} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setState(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='State *' value={State} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setCity(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='City *' value={City} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput maxLength={6} keyboardType="numeric" onChangeText={(text) => setPincode(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='Pincode *' value={Pincode} />
                        </View>
                    </View>
                    {/* <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput onChangeText={(text) => setIsLoading(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='Remark (Optional)' value={Remark} />
                        </View>
                    </View> */}
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Text>ADCode </Text>
                        {isSearching === true ? <ActivityIndicator color={'#222222'} /> : <Text>{isLocation?.latitude},{isLocation?.longitude}</Text>}
                    </View> */}
                </View>
                <View style={{ alignSelf: 'center', top: 40 }}>
                    <CommonButton
                        text='Save'
                        isLoader={isLoading}
                        isRightIcon={true}
                        onPress={() => onPress()} />
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
    },
    header: {
        backgroundColor: "#222222",
        height: 55,
        paddingTop: 5,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        color: '#ffffff',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 16
    },
});

export default NewAddressScreen;