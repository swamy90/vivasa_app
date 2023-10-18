import React from 'react';
import { SafeAreaView, View, Text, Image, Clipboard, FlatList, ScrollView, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage } from "react-native-flash-message";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MY_BASE_URL } from '../../global';
// import { ScratchCard } from 'rn-scratch-card';
// network 
import FormData from 'form-data';


const OfferScreen = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [favourite, setFavourite] = React.useState([]);
    const navigation = useNavigation();
    const [MAX_HEIGHT] = React.useState(215);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            getCategoryData();
        });
    }, [false]);

    const copyOfferCode = (data) => {
        showMessage({
            message: 'Coupon Code',
            description: 'Coupon code copy Successfull!',
            type: "success",
        });
        Clipboard.setString(data?.item?.promocode.toUpperCase());
    }

    const renderItemsForOffer = (items) => {

        return (
            <TouchableOpacity onPress={() => copyOfferCode(items)} style={{ backgroundColor: '#000000', width: Dimensions.get('screen').width / 2 - 9, height: 250, padding: 10, margin: 2, elevation: 5, borderRadius: 10 }}>
                <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 22, marginTop: 20, textTransform: 'uppercase' }}>{items?.item?.promocode}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <View>
                        <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 20, fontSize: 72 }}>{items?.item?.discount_amount}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 40 }}>₹</Text>
                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 15, marginTop: -6 }}>OFF</Text>
                    </View>
                </View>
                <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 15 }}>min order ₹ {items?.item?.amount}/-</Text>
                <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 13, backgroundColor: 'black', paddingVertical: 2, borderColor: 'white', borderWidth: 1, borderStyle: 'dashed', marginTop: 15, textTransform: 'uppercase' }}>{items?.item?.promocode}</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute', bottom: 10 }}>
                    <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 10 }}>{items?.item?.from_date} to </Text>
                    <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 10, marginRight: 10 }}>{items?.item?.to_date}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const handleScratch = (status) => {
        navigation.navigate('CartScreen');
    }

    const getCategoryData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/coupon-code-list";
        formData.append("user_id", user?.user?.id);
        const response = await fetch(URLs, {
            method: 'GET',
            // body: formData
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('submitCustomer', JSON.stringify(submitCustomer));
        if (submitCustomer.status) {
            setFavourite(submitCustomer?.coupons);
        }
    }


    return (
        <SafeAreaView>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ backgroundColor: 'rgb(239,244,250)', height: '100%' }}>
                <View style={{
                    backgroundColor: '#222222',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    shadowColor: '#b4b4b4',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 5, tintColor: '#ffffff' }} source={require('../../assets/images/arrow.png')} />
                        <Text style={{ fontWeight: '800', fontSize: 15, color: '#ffffff' }}>Back</Text>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', color: '#FFFFFF', fontSize: 17, marginRight: 30, letterSpacing: 1.5, fontWeight: 'bold' }}>Offers</Text>
                    <TouchableOpacity onPress={() => handleScratch()}>
                        <Image
                            style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#ffffff' }}
                            source={require('../../assets/images/shopping_cart.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 5 }}>
                    {favourite.length < 0 ?
                        <View>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'center' }} source={require('../../assets/images/no_product.png')} />
                        </View>
                        :
                        <View style={{ height: '100%', width: '100%' }}>
                            <FlatList
                                data={favourite}
                                keyExtractor={(items) => items.id}
                                numColumns={2}
                                renderItem={(items) => renderItemsForOffer(items)}
                            />
                        </View>}
                </View>
            </View>
        </SafeAreaView>
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

export default OfferScreen
