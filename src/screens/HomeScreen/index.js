import React from 'react';
import Carousel from 'simple-carousel-react-native';
import { SafeAreaView, View, Text, Image, TextInput, FlatList, ScrollView, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import MarqueeText from 'react-native-marquee';
import { showMessage } from "react-native-flash-message";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { GooglePay } from 'react-native-google-pay';
// firebase 
import { firebase } from '@react-native-firebase/database';
// inner items
import renderItems from '../../components/categories';
// network 
import FormData from 'form-data';
// MY_BASE_URL
import { MY_BASE_URL } from '../../global/index';

const HomeScreen = () => {

    const allowedCardNetworks = ['VISA', 'MASTERCARD'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
    const [isLoading, setIsLoading] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [categories, setCategory] = React.useState([]);
    const [AddressList, setAddressList] = React.useState([]);
    const [defaultAddressId, setDefaultAddressId] = React.useState(null);
    const [defaultAddress, setDefaultAddress] = React.useState(null);
    const [torchMode, setTorchMode] = React.useState('off');
    const [cameraType, setCameraType] = React.useState('back');
    const [trending, setTrending] = React.useState([]);
    const [slider, setSlider] = React.useState([]);
    const [brand, setBrand] = React.useState([]);
    const refRBSheet = React.useRef();
    const navigation = useNavigation();
    const [MAX_HEIGHT] = React.useState(215);

    const ClickToGooglePay = () => {
        const requestData = {
            cardPaymentMethod: {
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    // stripe (see Example):
                    gateway: 'stripe',
                    gatewayMerchantId: '',
                    stripe: {
                        publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
                        version: '2018-11-08',
                    },
                    // other:
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                },
                allowedCardNetworks,
                allowedCardAuthMethods,
            },
            transaction: {
                totalPrice: '10',
                totalPriceStatus: 'FINAL',
                currencyCode: 'USD',
            },
            merchantName: 'Example Merchant',
        };

        // Set the environment before the payment request
        GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

        // Check if Google Pay is available
        GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
            .then((ready) => {
                if (ready) {
                    // Request payment token
                    GooglePay.requestPayment(requestData)
                        .then((token) => {
                            // Send a token to your payment gateway
                        })
                        .catch((error) => console.log(error.code, error.message));
                }
            })
    }

    const playRingtone = async () => {
        // console.log('playRingtone');
        // try {
        //     let value = await AsyncStorage.getItem('@storage_Key'); // packages_Key
        //     let packagex = await AsyncStorage.getItem('@packages_Key'); // packages_Key
        //     const respnse = JSON.parse(value);
        //     const packages = JSON.parse(packagex);

        //     console.log(respnse);
        //     console.log(packages);

        //     if (respnse?.user?.user_type === 'Store') {
        //         if (packages !== null) {
        //             navigation.navigate('NotificationAlertScreen');
        //         } else {
        //             navigation.navigate('PackagesScreen'); // PackagesScreen
        //         }
        //     } else if (respnse?.user?.user_type === 'User') {
        //         navigation.replace('NotificationScreen');
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
        // navigation.navigate('NotificationScreen');  '@storage_Key'
        // await TrackPlayer.setupPlayer(); //
        // var track1 = {
        //     url: 'https://createdinam.in/sounds/sound.mp3', // Load media from the network
        //     title: 'Avaritia',
        //     artist: 'deadmau5',
        //     album: 'while(1<2)',
        //     genre: 'Progressive House, Electro House',
        //     date: '2014-05-20T07:00:00+00:00', // RFC 3339
        //     artwork: 'http://example.com/cover.png', // Load artwork from the network
        //     duration: 16 // Duration in seconds
        // };
        // await TrackPlayer.add(track1);
        // TrackPlayer.play();
        // console.log('playRingtone');
    };

    const getAddressList = async () => {
        setStatus(true);
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
        // console.log('getAddressList', JSON.stringify(submitCustomer));
        if (submitCustomer?.status) {
            setStatus(false);
            setAddressList(submitCustomer?.product);
            handleModal();
        } else {
            setStatus(false);
            handleModal();
        }
    }

    let addItem = item => {
        const firebaseConfig = {
            apiKey: "AIzaSyCiJRiM4S6RZukoZra9IrhAnjQdCd7a7jY",
            authDomain: "owlystore-7bf6e.firebaseapp.com",
            databaseURL: "https://owlystore-7bf6e-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "owlystore-7bf6e",
            storageBucket: "owlystore-7bf6e.appspot.com",
            messagingSenderId: "269878865465",
            appId: "1:269878865465:web:70ba833ccc65fbd1b0e7e8",
            measurementId: "G-V82X876J34"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.database().ref('AllEvents/', 'Saved');
        // console.log('datasaved', item);
    };

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            getCategoryData();
            getBrandList();
            addItem('navigation');
        });
    }, [false]);

    const handleDynamicLink = link => {
        // Handle dynamic link inside your own application
        console.log('handleDynamicLink', link?.url);
        // if (link.url === 'https://invertase.io/offer') {
        //     // ...navigate to your offers screen
        // }
    };

    React.useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, [false]);

    const getDefaultAddress = async () => {
        const value1 = await AsyncStorage.getItem('@addressId')
        const addressId = JSON.parse(value1);
        setDefaultAddressId(addressId);
        console.log('AddressId', addressId);
        const value2 = await AsyncStorage.getItem('@address')
        const address = JSON.parse(value2);
        console.log('DefaultAddress', address);
    }

    const getBrandList = async () => {
        const URLs = MY_BASE_URL + "api/brand-list";
        const response = await fetch(URLs, {
            method: 'GET',
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        // console.log('getBrandList', JSON.stringify(submitCustomer));
        if (submitCustomer.status) {
            setBrand(submitCustomer?.brand);
            getDefaultAddress();
        } else {

        }
    }

    const getCategoryData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key') //@address
        const address = await AsyncStorage.getItem('@address');
        setDefaultAddress(address)
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/home";
        formData.append("user_id", user?.user?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        setIsLoading(false);
        // console.log('submitCustomer', JSON.stringify(submitCustomer));
        if (submitCustomer.status) {
            setSlider(submitCustomer?.slider);
            setCategory(submitCustomer?.category);
            setTrending(submitCustomer?.new_arrivals);
        } else {

        }
    }

    const addProductInCart = async (data) => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        // console.log('addProductInCart', user?.user?.id);
        // setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/add-to-cart";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.id);
        formData.append("qty", "1");
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        // setIsLoading(false);
        getCategoryData();
        if (submitCustomer.status) {
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "success",
            });
        } else {
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "danger",
            });
        }
    }

    const addProductInFavList = async (data) => {
        console.log("data", JSON.stringify(data))
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/add-to-favorite";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        console.log("addProductInFavList", JSON.stringify(response))
        const submitCustomer = await response.json();
        console.log('addProductInFavList', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        getCategoryData();
        if (submitCustomer.status) {
            showMessage({
                message: submitCustomer?.message,
                description: submitCustomer?.message,
                type: "success",
            });
        } else {
            showMessage({
                message: submitCustomer?.message,
                description: submitCustomer?.message,
                type: "danger",
            });
        }
    }

    const removeProductInFavList = async (data) => {
        console.warn('removeProductInFavList', JSON.stringify(data))
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/remove-from-favorite";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        console.log('removeProductInFavList', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        setIsLoading(false);
        if (submitCustomer.status) {
            showMessage({
                message: submitCustomer?.message,
                description: submitCustomer?.message,
                type: "success",
            });
            getCategoryData();
        } else {
            showMessage({
                message: submitCustomer?.message,
                description: submitCustomer?.message,
                type: "danger",
            });
        }
    }

    const showCartScreen = (data) => {
        navigation.navigate('CartScreen', data);
    }

    const currencyFormat = (num) => {
        return '₹ ' + parseInt(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const FruitsItems = (items) => {
        return (
            <View style={{
                padding: 0, backgroundColor: '#ffffff', shadowColor: '#b4b4b4',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                margin: 1,
                width: Dimensions.get('screen').width / 2.1
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', marginTop: 5, zIndex: 999, padding: 10, paddingTop: -5 }}>
                    <Text style={{ fontSize: 10, fontWeight: '800', backgroundColor: 'rgb(92,150,65)', paddingLeft: 4, paddingRight: 4, color: '#ffffff', borderRadius: 12, paddingTop: 2, paddingBottom: 2, display: 'none' }}>* {items.item.rating}</Text>
                    {items.item.wishlist_status !== "Yes" ? <TouchableOpacity onPress={() => addProductInFavList(items.item)} style={{ flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: 'orange' }} source={require('../../assets/images/add_favorite.png')} />
                    </TouchableOpacity> : <TouchableOpacity onPress={() => removeProductInFavList(items.item)} style={{ flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: 'orange' }} source={require('../../assets/images/fill_favorite.png')} />
                    </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity style={{ padding: 0 }} onPress={() => navigation.navigate('ProductDetailsScreen', items?.item)}>
                    <Image style={{ height: 200, width: '100%', resizeMode: 'cover' }} source={{ uri: MY_BASE_URL + 'storage/' + items?.item?.image }} />
                </TouchableOpacity>
                <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                    <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: '600' }}>{items.item.product_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 10, marginRight: 10, marginBottom: 0 }}>
                    <Text style={{ fontSize: 8, marginBottom: 5 }} numberOfLines={2}>{items.item.slug}</Text>
                </View>
                <Text style={{ fontSize: 14, textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginRight: 5, marginLeft: 10, }}>{currencyFormat(items.item.market_price)}/-</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
                    <View style={{ flex: 1, marginRight: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{currencyFormat(items.item.price)}</Text>
                    </View>
                    {/* <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', }}>
                        {items.item.cart_status === "Yes" ?
                            <TouchableOpacity onPress={() => showCartScreen(items.item)} style={{ backgroundColor: '#222222', padding: 2, borderRadius: 200, paddingHorizontal: 15, paddingVertical: 5 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/shopping_cart.png')} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => addProductInCart(items.item)} style={{ backgroundColor: '#222222', padding: 2, borderRadius: 200, paddingHorizontal: 15, paddingVertical: 5 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/shopping_cart.png')} />
                            </TouchableOpacity>
                        }
                    </View> */}
                </View>
            </View>
        )

    }

    const handleModal = () => {
        refRBSheet.current.open();
    }

    const handleCloseModal = () => {
        refRBSheet.current.close();
    }

    const createNewAddress = () => {
        navigation.navigate('NewAddressScreen');
    }

    const saveDefaultAddress = async (data) => {
        const addressId = data?.id;
        const addressFull = data?.address + '(' + data.pincode + ')';
        await AsyncStorage.setItem('@addressId', JSON.stringify(addressId))
            .then(json => {
                console.log('success!1', JSON.stringify(json));
                AsyncStorage.setItem('@address', JSON.stringify(addressFull))
                    .then(json => {
                        console.log('success!2', JSON.stringify(json));
                        setDefaultAddress(addressFull);
                        getDefaultAddress();
                        refRBSheet.current.close();
                    }).catch(error => {
                        console.log('error! @address:-2 ' + error);
                    });
            }).catch(error => {
                console.log('error! @address:-1 ' + error);
            });
    }

    const enableSearch = async () => {
        // navigation.navigate('NotificationScreen');
        Toast.show({
            type: 'error',
            text1: 'Opps!',
            text2: 'Search Product Not Enable!'
        });
    }

    const goToBarcodeScanner = () => {
        navigation.navigate('BarcodeScannerScreen');
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{
                backgroundColor: '#222222',
                padding: 10,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                shadowColor: '#b4b4b4',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <View style={{ alignSelf: 'center', flex: 1 }}>
                        <TouchableOpacity onPress={() => getAddressList()} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                            <Image style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 5, tintColor: '#ffffff' }} source={require('../../assets/images/home-s/location.png')} />
                            {status === true ? <ActivityIndicator color={'#ffffff'} /> :
                                <MarqueeText speed={1} loop={true} delay={10000} marqueeOnStart={true} numberOfLines={1} style={{ textAlign: 'center', color: 'white', lineHeight: 20, width: Dimensions.get('screen').width / 2, }}>{defaultAddress !== null ? defaultAddress : 'Please Select Default Address!'}</MarqueeText>}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => goToBarcodeScanner()} style={{ marginRight: 10 }}>
                        <Image style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/qr_code.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => playRingtone()} style={{}}>
                        <Image style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/notification.png')} />
                        <View style={{ position: 'absolute', right: 1, top: 5, backgroundColor: 'white', borderRadius: 100, height: 15, width: 15 }}>
                            <Text style={{ fontSize: 11, alignSelf: 'center', fontWeight: 'bold', marginBottom: 4 }}>9</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity onPress={() => navigation.navigate("ProductSearch")} style={{
                    shadowColor: '#b4b4b4',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    <TextInput
                        style={{ backgroundColor: 'white', marginTop: 10, marginBottom: 10, borderRadius: 10, height: 50, padding: 10, paddingLeft: 15 }}
                        placeholder={'What would you like to buy today?'}
                        onFocus={() => enableSearch()}
                        editable={false}
                        numberOfLines={1}
                    />
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain', position: 'absolute', right: 10, top: 25 }} source={require('../../assets/images/home-s/m-search.png')} />
                </TouchableOpacity>
            </View>
            <View style={{}}>
                {isLoading === true ?
                    <View style={{ flex: 1 }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'center' }} source={require('../../assets/images/no_product.png')} />
                    </View> :
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ height: Dimensions.get('screen').height - MAX_HEIGHT, marginTop: 15 }}>
                        <View style={{}}>
                            <View style={{ alignSelf: 'center', }}>
                                <Carousel
                                    width={Dimensions.get('screen').width - 16}
                                    height={150}
                                    showScroll={false}
                                    showBubbles={true}
                                    color={'orange'} >
                                    {slider.length > 0 ? slider.map((items) => <View><Image style={{ resizeMode: 'contain', width: '100%', height: 150, borderRadius: 20 }} source={{ uri: MY_BASE_URL + 'storage/' + items.image }} /></View>) : <Text>No Data</Text>}
                                </Carousel>
                            </View>
                            <View style={{
                                padding: 10, backgroundColor: 'white', shadowColor: '#b4b4b4',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                marginBottom: 15,
                            }}>
                                <Text style={{ fontWeight: '600', marginLeft: 5 }}>Categories</Text>
                                <View>
                                    <FlatList
                                        data={categories}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={(items) => {
                                            return <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen', items)}>
                                                {renderItems(items)}
                                            </TouchableOpacity>
                                        }}
                                        keyExtractor={(items) => items.id}
                                    />
                                </View>
                            </View>
                            {/* <View style={{ padding: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', letterSpacing: 1 }}>Trending</Text>
                            </View> */}
                            <View style={{
                                // backgroundColor: 'rgb(231,254,248)', width: '100%', paddingBottom: 10, shadowColor: '#b4b4b4',
                                // shadowOffset: { width: 0, height: 1 },
                                // shadowOpacity: 0.8,
                                // shadowRadius: 2,
                                // elevation: 5,
                            }}>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingBottom: 5 }}>
                                    <Text style={{ flex: 1, color: '#222222', fontSize: 12, fontWeight: 'bold' }}>Flash Deal: Avail any 3 Deal</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#222222', paddingLeft: 8, paddingRight: 8, borderRadius: 40, paddingTop: 3, paddingBottom: 3 }}>
                                        <Image style={{ width: 10, height: 10, resizeMode: 'contain' }} source={require('../../assets/images/home-s/w.png')} />
                                        <Text style={{ textTransform: 'uppercase', color: 'white', marginLeft: 3, fontSize: 10 }}>Share</Text>
                                    </View>
                                </View> */}
                                <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                                    <FlatList
                                        data={brand}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={(items) => (
                                            <TouchableOpacity onPress={() => navigation.navigate('BrandProductScreen', items)} style={{ backgroundColor: '#ffffff', marginRight: 5 }}>
                                                <Image style={{ height: 120, width: 120, borderRadius: 5, resizeMode: 'contain' }} source={{ uri: MY_BASE_URL + 'storage/' + items?.item?.image }} />
                                                <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', textTransform: 'uppercase', color: '#000000' }}>{items?.item?.brand_name}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(items) => items.id}
                                    />
                                </View>
                            </View>
                            <LinearGradient colors={['rgb(252,236,235)', 'rgb(252,236,235)']} style={{ flexDirection: 'row', alignItems: 'center', padding: 6, paddingBottom: 5, marginBottom: 5 }}>
                                <View style={{ marginBottom: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ flex: 1 }}>Most Popular</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>View All </Text>
                                            <Image style={{ width: 12, height: 10, resizeMode: 'contain', tintColor: 'grey' }} source={require('../../assets/images/noti-arrow.png')} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <FlatList
                                            data={trending.slice(0, 14)}
                                            numColumns={2}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={(items) => FruitsItems(items)}
                                            keyExtractor={(items) => items.id}
                                        />
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    </ScrollView>
                }
            </View>
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
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => createNewAddress()} style={{ borderStyle: 'dashed', borderWidth: 1, borderColor: '#000000', padding: 6, marginBottom: 4 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#000000' }}>Add New Address</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={AddressList}
                        keyExtractor={(items) => items.id}
                        renderItem={(items) =>
                            <TouchableOpacity onPress={() => saveDefaultAddress(items?.item)} style={{ margin: 2, backgroundColor: '#ffffff', padding: 10, borderRadius: 10, borderStyle: 'dashed', borderWidth: defaultAddressId === items?.item?.id ? 1 : 0, borderColor: '#000000' }}>
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
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});

export default HomeScreen;