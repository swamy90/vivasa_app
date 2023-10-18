import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Modal, FlatList, TouchableOpacityBase, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { MY_BASE_URL, Image_Files_URL } from '../../global';
// network 
import FormData from 'form-data';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";

const CategoryScreen = () => {

    var data = new FormData();
    const navigation = useNavigation();
    const params = useRoute();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const [CategoryProduct, setCategoryProduct] = React.useState([]);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focus');
            // console.log('inside CategoryScreen', params)
            // getCategoryByProductData();
            getProductData();
            getCategoryListByProduct();
        });
    }, [false]);

    const sOpenContactsModal = () => {
        setIsVisible(!isVisible);
    }

    // const getCategoryByProductData = async () => {
    //     const value = await AsyncStorage.getItem('@storage_Key')
    //     const user = JSON.parse(value);
    //     console.log('addProductInCart', user?.user?.id);
    //     setIsLoading(true);
    //     data.append('category_id', params?.params?.item?.id) // params?.params?.item?.cat_id)
    //     data.append('user_id', user?.user?.id) // params?.params?.item?.cat_id)
    //     const URLs = MY_BASE_URL + "api/category-product-list";
    //     const response = await fetch(URLs, {
    //         method: 'post',
    //         body: data,
    //     });
    //     setIsLoading(false);
    //     const submitCustomer = await response.json();
    //     console.log('getCategoryByProductData', JSON.stringify(submitCustomer));
    //     if (submitCustomer.status) {
    //         setIsVisible(submitCustomer.status)
    //         setCategoryProduct(submitCustomer.product);
    //     } else {
    //         setIsVisible(submitCustomer.status)
    //         setCategoryProduct([]);
    //     }
    // }

    // const addProductInCart = async (data) => {
    //     const value = await AsyncStorage.getItem('@storage_Key');
    //     const user = JSON.parse(value);
    //     console.log('addProductInCart', user?.user?.id);
    //     setIsLoading(true);
    //     const formData = new FormData();
    //     const URLs = MY_BASE_URL + "api/add-to-cart";
    //     formData.append("user_id", user?.user?.id);
    //     formData.append("product_id", data?.id);
    //     formData.append("qty", "1");
    //     const response = await fetch(URLs, {
    //         method: 'POST',
    //         body: formData
    //     });
    //     const submitCustomer = await response.json();
    //     // console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
    //     setIsLoading(false);
    //     getCategoryByProductData();
    //     if (submitCustomer.status) {
    //         Toast.show({
    //             type: 'success',
    //             text1: 'Congratulations',
    //             text2: submitCustomer?.message
    //         });
    //     } else {
    //         Toast.show({
    //             type: 'success',
    //             text2: submitCustomer?.message
    //         });
    //     }
    // }
    const getProductData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        setIsLoading(true);
        const formData = new FormData();

        const URLs = MY_BASE_URL + "api/product-details";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", params?.item?.id);
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

    const addProductInCart = async (item) => {
        console.log("item in new---", item)
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart***', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/add-to-cart";
        console.log("url in formdata", URLs)
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", item?.id);
        formData.append("qty", "1");
        formData.append("attribute_color", "red");
        formData.append("attribute_size", "M")
        formData.append("attribute_set_status", "Yes")
        console.log("formmdata%%", formData)
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        console.log('add in cart', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        setIsLoading(false);
        getProductData();

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

    const addProductInFavList = async (data) => {
        console.log("data",data)
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/add-to-favorite";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        console.log('res',JSON.stringify(formData));
        setIsLoading(false);
        // getCategoryByProductData();
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

    const removeProductInFavList = async (data) => {
        const value = await AsyncStorage.getItem('@storage_Key');
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/remove-favourite";
        formData.append("user_id", user?.user?.id);
        formData.append("product_id", data?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData
        });
        const submitCustomer = await response.json();
        // console.log('submitCustomer', JSON.stringify(submitCustomer) + JSON.stringify(formData));
        setIsLoading(false);
        getCategoryByProductData();
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

    const getCategoryListByProduct = async () => {
        const URLs = MY_BASE_URL + "api/category-product-list";
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log("inside user", user)
        const formData = new FormData();
        formData.append("user_id", user?.user?.id);
        formData.append("category_id", params?.params?.item?.id);
        setIsLoading(true)
        axios.post(URLs, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                console.log("res in getCategoryListByProduct", response);
                setIsLoading(false)
                setCategoryProduct(response?.data?.cart)
            })
            .catch((err) => {
                console.log("err in getCategoryListByProduct", JSON.stringify(err));
            });
    }

    const renderCatByProduct = (items) => {
        console.log("item in renderCatByProduct", items)
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
                        <Image style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: 'orange' }} source={require('../../assets/images/add_favorite.png')} />
                    </TouchableOpacity> : <TouchableOpacity onPress={() => removeProductInFavList(items.item)} style={{ flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
                        <Image style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: 'orange' }} source={require('../../assets/images/fill_favorite.png')} />
                    </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity style={{ padding: 0 }} onPress={() => navigation.navigate('ProductDetailsScreen', items?.item)}>
                    <Image style={{ height: 200, width: '100%', resizeMode: 'cover' }} source={{ uri: Image_Files_URL + items?.item?.product_image }} />
                </TouchableOpacity>
                <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                    <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: '600' }}>{items.item.product_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 10, marginRight: 10, marginBottom: 5 }}>
                    <Text style={{ fontSize: 10, marginBottom: 5 }} numberOfLines={2}>{items.item.specifications}/-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
                    <View style={{ flex: 1, marginRight: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginRight: 5 }}>₹ {items.item.market_price}/-</Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', }}>₹ {items.item.price}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        {items.item.cart_status === "Yes" ?
                            <TouchableOpacity onPress={() => showCartScreen()} style={{ backgroundColor: '#222222', padding: 2, borderRadius: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>View Cart</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => addProductInCart(items.item)} style={{ backgroundColor: '#222222', padding: 2, borderRadius: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>ADD</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    const showCartScreen = () => {
        navigation.navigate('CartScreen');
    }

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: 'rgb(239,244,250)', height: '100%' }}>
                <View style={{
                    backgroundColor: '#222222', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, flexDirection: 'row', alignItems: 'center', padding: 15, shadowColor: '#b4b4b4',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#FFFFFF', borderRadius: 100, padding: 5, marginRight: 10 }}>
                            <Image style={{ width: 12, height: 12, resizeMode: 'contain' }} source={require('../../assets/images/arrow.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sOpenContactsModal()}>
                            <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF' }}>{params?.params?.item?.category_name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: '800', color: '#FFFFFF' }}>Categories</Text>
                                <TouchableOpacity>
                                    <Image style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: '#FFFFFF', transform: [{ rotate: '270deg' }], marginLeft: 5 }} source={require('../../assets/images/arrow.png')} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ flex: 1, textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}></Text>
                    {/* <TouchableOpacity style={{ backgroundColor: '#FFFFFF', borderRadius: 100, padding: 5, marginRight: 5 }}>
                        <Image style={{ width: 12, height: 12, resizeMode: 'contain' }} source={require('../../assets/images/home-s/m-search.png')} />
                    </TouchableOpacity> */}
                </View>
                {isVisible === false ?
                    <View>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'center' }} source={require('../../assets/images/no_product.png')} />
                    </View> :
                    <>
                        {isLoading ? <ActivityIndicator size={"large"} color={"#fff"}style={{justifyContent:'center',alignSelf:'center',flex:1}} /> : <View style={{ padding: 10, backgroundColor: 'rgb(226,230,229)', flex: 1 }}>
                            <FlatList
                                data={CategoryProduct}
                                numColumns={2}
                                keyExtractor={(items) => items.id}
                                renderItem={(items, index) => renderCatByProduct(items)}
                            />
                        </View>}
                    </>}
            </View>
        </SafeAreaView>
    )
}

export default CategoryScreen
