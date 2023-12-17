import React from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image_Files_URL, MY_BASE_URL, MY_STORAGE_URL } from '../../global/index';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
// network 
import FormData from 'form-data';
import RazorpayCheckout from 'react-native-razorpay';

const SalesScreen = () => {

    const [status, setStatus] = React.useState(false);
    const [defaultAddressId, setDefaultAddressId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOrderLoading, setOrderIsLoading] = React.useState(false);
    const [cart, setCart] = React.useState([]);
    const [AddressList, setAddressList] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState('');
    const [cartCount, setCartCount] = React.useState('');
    const [promoCode, setPromoCode] = React.useState('');
    const [promocodeApply, setPromocodeApply] = React.useState(false);
    const navigation = useNavigation();
    const refRBSheet = React.useRef();
    const [MAX_HEIGHT] = React.useState(215);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            getCategoryData();
        });
    }, [false]);

    const handleCloseModal = () => {
        refRBSheet.current.close();
    }

    const createNewAddress = () => {
        navigation.navigate('NewAddressScreen');
    }

    const handleModal = () => {
        refRBSheet.current.open();
    }

    const getCategoryData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/my-cart-list";
        formData.append("user_id", user?.user?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData,
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('in my cart', JSON.stringify(submitCustomer));
        if (submitCustomer.status) {
            if (submitCustomer?.cart) {
                setCart(submitCustomer?.cart);
                setCartCount(submitCustomer?.dilevery_charge);
                setTotalPrice(submitCustomer?.total_amount);
            } else {
                setCart([]);
                setCartCount('0');
                setTotalPrice('');
            }
        } else {
            setCart([]);
            setCartCount('0');
            setTotalPrice('');
        }
    }

    const addProductInCart = async (data) => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        let count = parseInt(data?.qty) + 1;
        console.log('addProductInCart' + count, user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/update-cart";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.product_id);
        formData.append("qty", count);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        setIsLoading(false);
        getCategoryData();
        if (submitCustomer.status) {
            Toast.show({
                type: 'success',
                text1: 'Cart Update',
                text2: submitCustomer?.message
            });
        } else {
            Toast.show({
                type: 'errror',
                text2: submitCustomer?.message
            });
        }
    }

    const minusProductInCart = async (data) => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        let count = parseInt(data?.qty) - 1;
        console.log('addProductInCart' + count, user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/update-cart";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.product_id);
        formData.append("qty", count);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        setIsLoading(false);
        getCategoryData();
        if (submitCustomer.status) {
            Toast.show({
                type: 'success',
                text1: 'Cart Update',
                text2: submitCustomer?.message
            });
        } else {
            Toast.show({
                type: 'errror',
                text2: submitCustomer?.message
            });
        }
    }

    const removeProductInCart = async (data) => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/remove-from-cart";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.product_id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        setIsLoading(false);
        getCategoryData();
        if (submitCustomer.status) {
            Toast.show({
                type: 'success',
                text1: 'Congratulations',
                text2: submitCustomer?.message
            });
        } else {
            Toast.show({
                type: 'success',
                text2: submitCustomer?.message
            });
        }
    }

    const currencyFormat = (num) => {
        console.log("currencyFormat", num)
        return '₹ ' + parseInt(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const placeOrder = async (data) => {
        console.log(data?.id);
        handleCloseModal();
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

    const getAddressList = async () => {
        setOrderIsLoading(true);
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/my-address-list";
        formData.append("user_id", user?.user?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData,
        });
        const submitCustomer = await response.json();
        console.log('getAddressListx', JSON.stringify(submitCustomer));
        if (submitCustomer?.status === true) {
            setOrderIsLoading(false);
            setAddressList(submitCustomer?.product);
            handleModal();
        } else {
            setOrderIsLoading(false);
            handleModal();
            showMessage({
                message: "Something went wrong!",
                description: submitCustomer?.message,
                type: "danger",
            });
        }
    }

    const payMeMoney = async (params) => {
        var finalAmt = totalPrice * 100;
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.name);
        console.log('payMeMoney:::->' + finalAmt);
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_x8WTYeDwK81gYf', // Your api key // rzp_test_x8WTYeDwK81gYf 
            amount: finalAmt,
            order_id: params?.razorpayOrderId,
            name: user?.user?.name,
            prefill: {
                email: 'void@razorpay.com',
                contact: '9999999999',
                name: 'Razorpay Software',
            },
            theme: { color: '#222222' },
        };
        RazorpayCheckout.open(options)
            .then(data => {
                // handle success
                // alert(`Success: ` + JSON.stringify(data));
                console.log('RazorpayCheckout', 'Success ' + JSON.stringify(data));
                finalPaymentStatusCalls(data, params?.order_number);
            })
            .catch(error => {
                // handle failure
                if (error !== undefined) {
                    console.log('RazorpayCheckout', 'failure' + JSON.stringify(error));
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

    const applyPromocode = async () => {
        if (promoCode !== '') {
            //api/apply-promocode
            const value = await AsyncStorage.getItem('@storage_Key')
            const user = JSON.parse(value);
            console.log('applycode', user?.user?.id);

            setOrderIsLoading(true);
            const formData = new FormData();
            const URLs = MY_BASE_URL + "api/apply-promocode";
            formData.append("user_id", user?.user?.id);
            formData.append("promocode", promoCode);
            const response = await fetch(URLs, {
                method: 'POST',
                body: formData,
            });
            const submitCustomer = await response.json();
            console.log('applyPromocode', JSON.stringify(submitCustomer));
            if (!submitCustomer?.status) {
                setOrderIsLoading(false);
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Promocode!',
                    text2: submitCustomer?.message
                });
            } else {
                setOrderIsLoading(false);
                setPromocodeApply(true);
                Toast.show({
                    type: 'success',
                    text1: 'Promocode!',
                    text2: submitCustomer?.message
                });
                getCategoryData();
                // payMeMoney(submitCustomer);
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Invalid Promocode!',
                text2: 'Please Enter Valid Promocode!'
            });
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ padding: 20, backgroundColor: '#222222', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 5, tintColor: '#ffffff' }} source={require('../../assets/images/arrow.png')} />
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>My Cart</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#FFFFFF', width: 17, height: 17, alignItems: 'center', borderRadius: 100, elevation: 5 }}>
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#222222', marginBottom: 1, textAlign: 'center' }}>{cartCount}</Text>
                </View>
            </View>
            {isLoading ? <View /> :
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {cart.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={cart}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(items) => items.id}
                                    renderItem={(items) => {
                                        console.log("item sin render", items)
                                        return <View style={{ padding: 5, backgroundColor: '#fff', margin: 5, elevation: 1 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity style={{}}>
                                                    <Image style={{ height: 120, width: 120 }} source={{ uri: Image_Files_URL + items?.item?.product_image }} />
                                                </TouchableOpacity>
                                                <View style={{ flex: 1, marginLeft: 10 }}>
                                                    {/* <Text style={{ marginLeft: 5, fontSize: 15, paddingLeft: 4, paddingRight: 4, fontWeight: 'bold' }}>{items?.item?.size}</Text> */}
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                                        <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 15, flex: 1, color: '#000000' }} >{items?.item?.product_name}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{ color: '#000000', fontSize: 18 }}>{currencyFormat(items?.item?.price)}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', width: 70, marginTop: 10 }}>
                                                        <TouchableOpacity onPress={() => {
                                                            if (parseInt(items?.item?.qty) === 1) {
                                                                removeProductInCart(items?.item)
                                                            } else {
                                                                minusProductInCart(items?.item)
                                                            }
                                                        }} style={{ width: 20, height: 20, borderColor: '#000', borderWidth: 1, alignSelf: 'center' }}>
                                                            {parseInt(items?.item?.qty) === 1 ? <Image style={{ width: 15, height: 15, alignSelf: 'center', marginTop: 2, tintColor: 'red' }} source={require('../../assets/images/remove.png')} /> : <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>-</Text>}
                                                        </TouchableOpacity>
                                                        <View style={{ width: 30 }}>
                                                            <Text style={{ fontSize: 22, textAlign: 'center' }}>{items?.item?.qty}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() => addProductInCart(items?.item)} style={{ width: 20, height: 20, borderColor: '#000', borderWidth: 1, alignSelf: 'center' }}>
                                                            <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>+</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => removeProductInCart(items?.item)} style={{ position: 'absolute', top: 5, right: 0 }} >
                                                <Image style={{ width: 23, height: 23, tintColor: '#000', resizeMode: 'contain', marginRight: 10 }} source={require('../../assets/images/remove_fav.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    }}
                                />
                                <View style={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                                    <TextInput
                                        autoCapitalize
                                        style={{ borderStyle: 'dashed', borderColor: '#222222', borderWidth: 1, paddingLeft: 10, borderRadius: 10, textTransform: 'uppercase' }}
                                        placeholder='PROMOCODE HERE'
                                        placeholderTextColor={'#222222'}
                                        onChangeText={(text) => setPromoCode(text)}
                                    />
                                    <TouchableOpacity disabled={promocodeApply} onPress={() => applyPromocode()} style={{ position: 'absolute', top: 10, right: 16, alignItems: 'center', backgroundColor: promocodeApply === true ? 'grey' : '#222222', paddingVertical: 11, paddingHorizontal: 20, borderRadius: 10 }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}>Coming Soon</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ margin: 2, borderRadius: 5, backgroundColor: '#f1f1f1', padding: 15 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>Order Sumary</Text>
                                    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000', fontSize: 15 }}>Items Total</Text>
                                            <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 15 }}>{currencyFormat(totalPrice)}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000' }}>Shipping (Express)</Text>
                                            <Text style={{ fontWeight: 'bold', color: '#000000' }}>{currencyFormat(parseInt(cartCount) * 15)}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000' }}>Sale Tax</Text>
                                            <Text style={{ fontWeight: 'bold', color: '#000000' }}>{currencyFormat(parseInt(cartCount))}</Text>
                                        </View>
                                        <View style={{ height: 1, width: '100%', backgroundColor: '#b5b5b6', marginTop: 12, marginBottom: 12 }} />
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000', fontSize: 16 }}>Grand Total</Text>
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}>{currencyFormat(totalPrice)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ display: 'none', margin: 2, borderRadius: 5, backgroundColor: '#f1f1f1', padding: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000' }}>Delivery Charges:</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{currencyFormat(parseInt(cartCount) * 15)}</Text>
                                    </View>
                                    <View style={{ height: 1.5, width: '100%', backgroundColor: '#b1b1b1', marginTop: 12, marginBottom: 12 }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000' }}>Tax Price:</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{currencyFormat(10)}</Text>
                                    </View>
                                    <View style={{ height: 1.5, width: '100%', backgroundColor: '#b1b1b1', marginTop: 12, marginBottom: 12 }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000' }}>Discount Price:</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{currencyFormat(25)}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: 'grey', marginTop: 12, marginBottom: 12 }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold', color: '#000000', fontSize: 15 }}>Total Price:</Text>
                                        <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 15 }}>{currencyFormat(totalPrice)}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1, marginLeft: 2, marginRight: 2, marginBottom: 2 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('NewAddressScreen')} style={{ alignItems: 'center', backgroundColor: 'green', paddingHorizontal: 15, paddingVertical: 16, borderRadius: 5, elevation: 5 }}>
                                            {isOrderLoading === true ?
                                                <ActivityIndicator color={'#ffffff'} style={{ alignSelf: 'center' }} />
                                                :
                                                <Text style={{ color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 15 }} >Pay Now</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={{ alignItems: 'center', marginTop: Dimensions.get('screen').width / 1 - 180 }}>
                                <Image style={{ width: 200, height: 200 }} source={require('../../assets/images/empty_cart.jpeg')} />
                                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Empty Cart</Text>
                            </View>
                        }
                    </View>
                </View>
            }
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }, container: {
                        backgroundColor: '#f1f1f1',
                        padding: 10
                    }
                }} >
                <View>
                    <TouchableOpacity onPress={() => createNewAddress()} style={{ borderStyle: 'dashed', borderWidth: 1, borderColor: '#000000', padding: 6, marginBottom: 4 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#000000' }}>Add New Address</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={AddressList}
                        keyExtractor={(items) => items.id}
                        renderItem={(items) =>
                            <TouchableOpacity onPress={() => placeOrder(items?.item)} style={{ margin: 2, backgroundColor: '#ffffff', padding: 10, borderRadius: 10, borderStyle: 'dashed', borderWidth: defaultAddressId === items?.item?.id ? 1 : 0, borderColor: '#000000' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#000000' }}>{items?.item?.first_name} </Text>
                                    <Text style={{ fontWeight: 'bold', color: '#000000' }}>{items?.item?.last_name}</Text>
                                </View>
                                <Text numberOfLines={2}>{items?.item?.address}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>{items?.item?.state}, </Text>
                                    <Text>{items?.item?.city}, </Text>
                                    <Text>Pincode {items?.item?.pincode}</Text>
                                </View>
                            </TouchableOpacity>}
                    />
                </View>
            </RBSheet>
        </View>
    );

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

// onPress={() => navigation.navigate('ProductDetailsScreen', items?.item)}

export default SalesScreen;