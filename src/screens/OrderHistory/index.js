import React, { Component, Profiler } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { MY_BASE_URL } from '../../global';

const OrderHistoryScreen = () => {

    const [isStatus, setStatus] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [orderHistory, setOrderHistory] = React.useState([]);
    const navigation = useNavigation();
    const routes = useRoute();

    useFocusEffect(
        React.useCallback(() => {
            getOrderHistoryData();
        }, [])
    );

    const getOrderHistoryData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + `api/my_order_list?user_id=${user?.user?.id}`;
        // formData.append("user_id", user?.user?.id);
        console.log("URL", `api/my-order-list?user_id=${user?.user?.id}`)
        const response = await fetch(URLs, {
            method: 'GET',
            // body: formData
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('OrderHistoryData', submitCustomer);
        if (submitCustomer?.status) {
            setOrderHistory(submitCustomer?.data);
        } else {

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'} // 9621100444- shree umesh 
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ padding: 20, backgroundColor: '#222222', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: '#ffffff' }}
                        source={require('../../assets/images/arrow.png')} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16 }}>Order History</Text>
            </View>
            <View style={{ flex: 1 }}>
                {orderHistory?.length === 0 ?
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>No Order Found</Text>
                    </View>
                    :
                    <FlatList
                        style={{ marginTop: 5,flex:1}}
                        data={orderHistory}
                        keyExtractor={(items) => items.id}
                        renderItem={(items) => {
                            return (
                                <View style={{ padding: 10, marginHorizontal: 5, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', elevation: 5, marginBottom: 5, borderRadius: 5, marginTop: 3 }}>
                                    <View style={{}}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 15, color: '#000000', }}>{items?.item?.first_name} {items?.item?.last_name}</Text>
                                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000', textTransform: 'uppercase' }}>OID_{items?.item?.order_number}</Text>
                                        </View>
                                        <Text numberOfLines={2} style={{ fontWeight: '600', fontSize: 14, color: '#b4b4b4', textTransform: 'capitalize', }}>Delivery Address: {items?.item?.address}, {items?.item?.state}, {items?.item?.city}, {items?.item?.pincode}</Text>
                                        <View style={{ marginVertical: 2 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000', flex: 1 }}>Transaction Status</Text>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: items?.item?.transaction_status === 'Failed' ? '#FF0000' : '#008000', }}>{items?.item?.transaction_status}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#008000', }}>INR ₹{items?.item?.grand_total}/- </Text>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: items?.item?.order_status === 'Pending' ? '#FFA500' : '#008000', flex: 1 }}>{items?.item?.payment_status}</Text>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: items?.item?.order_status === 'Pending' ? '#FFA500' : '#008000', }}>Order Status: {items?.item?.order_status}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
        width: 100,
        height: 100,
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    list_icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 15,
    },
    item_text: {
        fontWeight: 'bold'
    }
});

export default OrderHistoryScreen;