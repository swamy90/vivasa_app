import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Image_Files_URL, MY_BASE_URL } from '../../global';
import { useNavigation } from '@react-navigation/native';

export default function ProductSearch() {
    const [keywords, skeywords] = useState();
    const [CategoryProduct, setCategoryProduct] = React.useState([]);
    const [loading, sLoading] = useState(false);
    const navigation = useNavigation();


    const getProductBySearch = async () => {
        console.log("inside search")
        const URLs = MY_BASE_URL + "api/search-product-list";
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log("inside user", user)
        console.log("urls", URLs, keywords, user?.user?.id)
        sLoading(true)
        axios.post(URLs, {
            keywords: keywords,
            user_id: user?.user?.id,

        })
            .then((response) => {
                console.log("res in getProductBySearch", response?.data?.cart);
                sLoading(false)
                setCategoryProduct(response?.data?.cart)
            })
            .catch((err) => {
                console.log("err in getProductBySearch", err);
            });
    }
    const renderCatByProduct = (items) => {
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
                    {items.item.favstatus !== "Yes" ? <TouchableOpacity onPress={() => addProductInFavList(items.item)} style={{ flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
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
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 10, marginRight: 10, marginBottom: 5 }}>
                    <Text style={{ fontSize: 10, marginBottom: 5 }} numberOfLines={2}>{items.item.specifications}/-</Text>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10,marginBottom:10 }}>
                    <View style={{ flex: 1, marginRight: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginRight: 5 }}>₹ {items.item.market_price}/-</Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', }}>₹ {items.item.price}</Text>
                    </View>
                    {/* <View style={{ marginBottom: 10 }}>
                        {items.item.cart_status === "Yes" ?
                            <TouchableOpacity onPress={() => showCartScreen()} style={{ backgroundColor: '#222222', padding: 2, borderRadius: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>View Cart</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => addProductInCart(items.item)} style={{ backgroundColor: '#222222', padding: 2, borderRadius: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>ADD</Text>
                            </TouchableOpacity>
                        }
                    </View> */}
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#FFFFFF', borderRadius: 100, padding: 5, marginLeft: 10, marginTop: 15 }}>
                <Image style={{ width: 12, height: 12, resizeMode: 'contain' }} source={require('../../assets/images/arrow.png')} />
            </TouchableOpacity>
            <View style={{
                shadowColor: '#b4b4b4',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5, marginTop: 15
            }}>
                <TextInput
                    style={{ backgroundColor: 'white', marginTop: 10, marginBottom: 15, borderRadius: 10, height: 50, paddingLeft: 15, elevation: 10, margin: 20 }}
                    placeholder={'Search here'}
                    numberOfLines={1}
                    value={keywords}
                    onChangeText={(text) => skeywords(text)}
                />
                {keywords?.length > 3 ? <TouchableOpacity style={{ position: 'absolute', right: 25, top: 25 }}
                    onPress={getProductBySearch}
                >
                    {loading === true ? <Text style={{ paddingRight: 10 }}>loading...</Text> : <Text style={{ paddingRight: 10 }}>Click</Text> }
                    </TouchableOpacity>
                    : null}
            </View>

            {(keywords?.length !== "" || keywords?.length !== 0) && CategoryProduct?.length > 0 ? <View style={{ backgroundColor: 'rgb(226,230,229)' }}>
                <FlatList
                    data={CategoryProduct}
                    numColumns={2}
                    keyExtractor={(items) => items.id}
                    renderItem={(items, index) => renderCatByProduct(items)}
                />
            </View> : <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}><Text>No Product Found</Text>
            </View>}

        </View>
    )
}