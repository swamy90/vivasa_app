import React from "react";
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { Rating } from 'react-native-ratings';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ImageSlider } from "react-native-image-slider-banner";
import MarqueeText from 'react-native-marquee';
import HTML from "react-native-render-html";
import { MY_BASE_URL, MY_STORAGE_URL } from '../../global';
import { showMessage } from "react-native-flash-message";
import axios from "axios";

const ProductDetailsScreen = () => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [productDetails, setProductDetails] = React.useState({});
    const [favouriteStatus, setFavouriteStatus] = React.useState('Yes');
    const [ProductImage, setProductImage] = React.useState([]);
    const [rating, setRating] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);
    const navigation = useNavigation();
    const routes = useRoute();
    const [MAX_HEIGHT] = React.useState(215);

    useFocusEffect(
        React.useCallback(() => {
            const random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            setRating(random);
            getProductData();
            return () => {
                getProductData();
            };
        }, [])
    );

    const getProductData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        setIsLoading(true);
        const formData = new FormData();

        const URLs = MY_BASE_URL + "api/product-details";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", routes?.params?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        console.log("url body", URLs, formData)
        console.log('ProductData', JSON.stringify(formData));
        const submitCustomer = await response.json();
        setIsLoading(false);
        console.log('in submitCustomerrrr', JSON.stringify(submitCustomer));
        if (submitCustomer.status) {
            setProductImage(submitCustomer?.image_list);
            setProductDetails(submitCustomer?.product_details);
            calcPercentage(submitCustomer?.product_details);
            setFavouriteStatus(submitCustomer?.product_favourite_status);
        }
    }

    const calcPercentage = (data) => {
        console.log(JSON.stringify(data?.market_price));
        console.log(JSON.stringify(data?.sale_price));
        let diffrence = parseInt(data?.market_price) - parseInt(data?.sale_price);
        console.log('calcPercentage', diffrence);
        var newNum = parseInt(diffrence) / parseInt(data?.sale_price) * 100;
        setPercentage(Math.round(newNum));
        console.log(Math.round(newNum));
    }

    const addProductInFavList = async (data) => {
        console.log("data in 75", data)
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        // console.log("user id",user?.user?.id)
        // setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/add-to-favorite";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.id);
        console.log("url for fav", URLs, data?.id, formData)
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        // axios.post(URLs, {
        //     product_id: data?.id,
        //     user_id : user?.user?.id
        // })

        const submitCustomer = await response.json();
        console.log('submitCustomer in addProductInFavList', submitCustomer);
        setIsLoading(false);

        if (submitCustomer.status === true) {
            console.log("inside if");
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "success",

            });
        } else {
            console.log("inside else")
            showMessage({
                message: "Already added",
                description: submitCustomer?.message,
                type: "danger",

            });

        }
    }

    const removeProductInFavList = async (data) => {
        // const value = await AsyncStorage.getItem('@storage_Key');
        // const user = JSON.parse(value);
        // setIsLoading(true);
        // const formData = new FormData();
        // const URLs = MY_BASE_URL + "api/remove-favourite";
        // formData.append("user_id", user?.user?.id);
        // formData.append("product_id", data?.id);
        // const response = await fetch(URLs, {
        //     method: 'POST',
        //     body: formData
        // });
        // const submitCustomer = await response.json();
        // // console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        // setIsLoading(false);
        // getProductData();
        // if (submitCustomer.status) {
        //     Toast.show({
        //         type: 'success',
        //         text1: 'Congratulations',
        //         text2: submitCustomer?.message
        //     });
        // } else {
        //     Toast.show({
        //         type: 'success',
        //         text2: submitCustomer?.message
        //     });
        // }
        navigation.navigate('CartScreen');
    }

    const addProductInCart = async () => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        // setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/add-to-cart";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", routes?.params?.id);
        formData.append("qty", "1");
        formData.append("attribute_color", "red");
        formData.append("attribute_size", "M")
        formData.append("attribute_set_status", "Yes")
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        console.log('in addProductInCart', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        const submitCustomer = await response.json();

        // setIsLoading(false);
        // getProductData();

        if (submitCustomer.status) {
            showMessage({
                message: "Congratulations",
                description: submitCustomer?.message,
                type: "success",
            });
            navigation.navigate("CartScreen")
        } else {
            showMessage({
                message: "Already added",
                description: submitCustomer?.message,
                type: "danger",
            });
            navigation.navigate("CartScreen")
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
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.goBack()}>
                    <Image style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/arrow.png')} />
                </TouchableOpacity>
                <View style={{ marginRight: 20 }}>
                    <MarqueeText speed={1} loop={true} delay={10000} marqueeOnStart={true} numberOfLines={1} style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, }}>{routes?.params?.product_name}</MarqueeText>
                </View>
            </View>
            <ScrollView>
                {isLoading === true ? <View /> :
                    <View>
                        {/* <View style={{ padding: 0 }}>
                            <Image style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width / 1 }} source={{ uri: MY_BASE_URL + 'storage/' + ProductImage[0].image }} />
                        </View> */}
                        <ImageSlider
                            data={ProductImage}
                            autoPlay={true}
                            localImg={false}
                            caroselImageStyle={{ resizeMode: 'cover' }}
                            closeIconColor="#fff"
                        />
                        <View style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                            <Rating
                                type='star'
                                ratingCount={rating}
                                size={5}
                                imageSize={14}
                                isDisabled={true}
                                onFinishRating={(status) => console.log('status', status)}
                            />
                        </View>
                        <View style={{ padding: 10, marginBottom: 40 }}>
                            <View style={{ borderWidth: 1, paddingVertical: 2, paddingHorizontal: 7, borderRadius: 2, borderColor: 'orange', width: '50%' }}>
                                <Text style={{ fontWeight: 'bold', textTransform: 'capitalize', color: 'orange', textAlign: 'center' }}>Exclusive {percentage}% Discount</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: '#222222', fontSize: 18, flex: 1 }}>{productDetails?.product_name}</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#b1b1b1', textTransform: 'uppercase' }}>Sale Price </Text>
                            <View style={{ flex: 1, marginRight: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000000' }}>₹{productDetails?.price}.00 </Text>
                                <Text style={{ fontSize: 14, textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginRight: 5, fontWeight: 'bold', color: '#b1b1b1', marginTop: 2 }}>₹{productDetails?.market_price}.00</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                {/* <View style={{ paddingHorizontal: 8, paddingVertical: 5, backgroundColor: 'red', borderWidth: 1, elevation: 4 }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{productDetails?.size}</Text>
                                </View> */}
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#b4b4b4', marginTop: 10 }}>Product Description</Text>
                            <HTML source={{ html: productDetails?.long_description }} />
                            {/* <Text>{productDetails?.long_description}</Text> */}
                        </View>
                    </View>
                }
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 10, paddingVertical: 15, paddingHorizontal: 15, zIndex: 999, backgroundColor: '#222222', alignSelf: 'center', borderRadius: 10, flexDirection: 'row', alignItems: 'center', elevation: 5 }}>
                <View>
                    {favouriteStatus === 'Yes' ? <TouchableOpacity onPress={() => console.log("inside")} style={{ flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/add_favorite.png')} />
                    </TouchableOpacity>
                        : <TouchableOpacity onPress={() => { console.log("inside 250"); addProductInFavList(productDetails) }} style={{ flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/fill_favorite.png')} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ height: 10, width: .5, backgroundColor: '#fff', marginHorizontal: 10 }} />
                <View>
                    <TouchableOpacity onPress={() => addProductInCart()} style={{ flex: 1, alignItems: 'flex-end', }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#ffffff' }} source={require('../../assets/images/shopping_cart.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


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

export default ProductDetailsScreen;