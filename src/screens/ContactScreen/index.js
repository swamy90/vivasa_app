import React from 'react';
import Carousel from 'simple-carousel-react-native';
import { SafeAreaView, View, Text, Image, TextInput, FlatList, ScrollView, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// network 
import FormData from 'form-data';
import { Image_Files_URL, MY_BASE_URL, MY_STORAGE_URL } from '../../global/index';
// favscreen
const ContactUs = () => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [favourite, setFavourite] = React.useState([]);
    const navigation = useNavigation();
    const [MAX_HEIGHT] = React.useState(215);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focus');
            getFavouriteList();
        });
    }, [false]);

    const getFavouriteList = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/my-favorite-list";
        console.log(URLs)
        formData.append("user_id", user?.user?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('favouriteList', JSON.stringify(submitCustomer?.cart));
        if (submitCustomer.status) {
            setFavourite(submitCustomer?.cart);
        } else {
            setFavourite([]);
        }
    }

    const removeProductInCart = async (data) => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/remove-from-favorite";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        // getCategoryData();
        if (submitCustomer.status) {
            console.log("insuide if")
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "success",

            });
            getFavouriteList();
        } else {
            console.log("insuide else")
            getFavouriteList();
            showMessage({
                message: "Already added",
                description: submitCustomer?.message,
                type: "danger",

            });

        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ padding: 20, backgroundColor: '#222222', flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 5 }} source={require('../../assets/images/home-s/1.png')} /> */}
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Wish List</Text>
            </View>
            <View style={{ paddingVertical: 14, alignSelf: 'center', borderColor: '#b4b4b4', borderTopWidth: .5, borderBottomWidth: .5, width: '100%', marginTop: 4 }}>
                <Text style={{ color: '#000', textAlign: 'center', textTransform: 'uppercase' }}>{favourite.length} items</Text>
            </View>
            <View style={{ flex: 1 }}>
                {favourite.length === 0 ?
                    <View>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'center' }} source={require('../../assets/images/no_product.png')} />

                    </View> :
                    <FlatList
                        data={favourite}
                        keyExtractor={(items) => items.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(items) => {
                            return (
                                <View style={{ padding: 5, backgroundColor: '#ffffff', margin: 5, elevation: 1 }}>
                                    <TouchableOpacity onPress={() => removeProductInCart(items?.item)} style={{ position: 'absolute', right: 5, top: 0, padding: 20, zIndex: 999 }}>
                                        <Image style={{ width: 20, height: 20, resizeMode: 'center' }} source={require('../../assets/images/remove_fav.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('ProductDetailsScreen', items?.item)}>
                                        <View style={{ flex: 1 / 2 }}>
                                            <Image style={{ height: 120, width: 120 }} source={{ uri: Image_Files_URL + items?.item?.product_image }} />
                                        </View>
                                        <View style={{ flex: 1, padding: 5 }}>
                                            <Text style={{ fontWeight: 'bold', color: '#000000' }}>MRP ₹{items?.item?.price}</Text>
                                            <Text style={{ marginRight: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>₹ {items?.item?.market_price}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{items?.item?.product_name}</Text>
                                            </View>
                                            {/* <Text numberOfLines={3}>{items?.item?.specifications}</Text> */}
                                            {items?.item?.size && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 10, paddingLeft: 4, paddingRight: 4, color: '#ffffff', backgroundColor: 'red', marginTop: 3 }}>{items?.item?.size}</Text>
                                            </View>}

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                }
            </View>
        </View>
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


{/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => addProductInCart(items?.item)} style={{ backgroundColor: '#fa8128', flex: 1, borderRadius: 5, elevation: 5, marginTop: 5, marginRight: 5 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 5, paddingRight: 5, paddingLeft: 5 }}>
            <Image style={{ width: 13, height: 13, tintColor: '#FFFFFF', resizeMode: 'contain', }} source={require('../../assets/images/clear_shopping.png')} />
            <Text style={{ fontWeight: 'bold', color: '#ffffff', paddingRight: 5, paddingLeft: 5 }}>Delete To Wishlist</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => addProductInCart(items?.item)} style={{ backgroundColor: '#e4b400', flex: 1, borderRadius: 5, elevation: 5, marginTop: 5 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 5 }}>
            <Image style={{ width: 13, height: 13, tintColor: '#FFFFFF', resizeMode: 'contain', marginRight: 10 }} source={require('../../assets/images/home-s/e-kart.png')} />
            <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Move To Cart</Text>
        </View>
    </TouchableOpacity>
</View> */}

// onPress={() => navigation.navigate('CategoryScreen', items)}

export default ContactUs;