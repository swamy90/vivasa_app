import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image_Files_URL, MY_BASE_URL } from '../../global';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';


export default function OrderDetails({ route }) {
    // console.log("props",route?.params?.items?.item?.order_number)
    const [isLoading, setIsLoading] = React.useState(false);
    const [orderDetail, setOrderDetail] = React.useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            getOrderDetails();
        }, [])
    );

    const getOrderDetails = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + `api/my_order_details?user_id=${user?.user?.id}&order_number=${route?.params?.items?.item?.order_number}`;
        // formData.append("user_id", user?.user?.id);
        console.log("URL", `api/my_order_details?user_id=${user?.user?.id}&order_number=${route?.params?.items?.item?.order_number}`)
        const response = await fetch(URLs, {
            method: 'GET',
            // body: formData
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('OrderHistoryData', submitCustomer?.data?.order_product_list);
        if (submitCustomer?.status) {
            setOrderDetail(submitCustomer?.data?.order_product_list);
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
                <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16 }}>Order Details</Text>
            </View>

            <View style={{ flex: 1 }}>
                {orderDetail?.length === 0 ?
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }}>No Order Details Found</Text>
                    </View>
                    :
                    <FlatList
                        style={{ marginTop: 5, flex: 1 }}
                        data={orderDetail}
                        keyExtractor={(items) => items.id}
                        renderItem={(items) => {
                            console.log("items***", items)
                            return (
                                <View style={{ padding: 10, backgroundColor: '#ffffff', elevation: 5, marginBottom: 5, borderRadius: 5, margin: 15 }}

                                >
                                    <View style={{}}>
                                        <View>
                                            {items?.item?.product_image === null ? <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/009/171/100/small/demo-symbol-concept-words-demo-on-wooden-blocks-photo.jpg" }} style={{ width: Dimensions.get("screen").width - 50, height: 150, resizeMode: 'cover', }} /> :
                                                <Image source={{ uri:  Image_Files_URL + items?.item?.product_image }} style={{ width: Dimensions.get("screen").width - 50, height: 150, resizeMode: 'cover', }} />}
                                        </View>
                                        <View style={{ flexDirection: 'column', marginTop: 8 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#000000', paddingTop: 5 }}>Product Name : {items?.item?.product_name}</Text>
                                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000', textTransform: 'uppercase', paddingTop: 5 }}>ORDER ID :  {items?.item?.order_number}</Text>
                                        </View>

                                        <View style={{}}>

                                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000', paddingTop: 5 }}> MRP :  INR ₹{items?.item?.price}/- </Text></View>
                                        </View>

                                        <View style={{}}>

                                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000', paddingTop: 5 }}> Booking Date :  {items?.item?.created_date} </Text></View>
                                        </View>
                                        <View style={{}}>

                                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000', paddingTop: 5 }}> Booking Time :  {items?.item?.created_time} </Text></View>
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
});