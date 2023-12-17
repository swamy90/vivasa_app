import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Modal, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { MY_BASE_URL } from '../../global';

const AddressListScreen = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [isStatus, setStatus] = React.useState(false);
    const [defaultAddress, setDefaultAddress] = React.useState(null);
    const [defaultAddressId, setDefaultAddressId] = React.useState(null);
    const [addressList, setAddressList] = React.useState([]);
    const navigation = useNavigation();
    const routes = useRoute();

    React.useEffect(async () => {
        navigation.addListener('focus', async () => {
            // call function
            console.log("inside")
            getDefaultAddress();
            getAddressList();
        });
        return () => {
            console.log('This will be logged on unmount');
        };
    }, [false]);

    const getAddressList = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/my-address-list";
        formData.append("user_id", user?.user?.id);
        const response = await fetch(URLs, {
            method: 'POST',
            body: formData,
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('getAddressList', JSON.stringify(submitCustomer));
        if (submitCustomer?.status) {
            setStatus(submitCustomer?.status);
            setAddressList(submitCustomer?.product);
        } else {

        }
    }

    const getDefaultAddress = async () => {
        const value1 = await AsyncStorage.getItem('@addressId')
        const addressId = JSON.parse(value1);
        setDefaultAddressId(addressId);
        console.log('AddressId', addressId);
        const value2 = await AsyncStorage.getItem('@address')
        const address = JSON.parse(value2);
        console.log('DefaultAddress', address);
    }

    const saveDefaultAddress = async (data) => {
        const addressId = data?.id;
        const addressFull = data?.address + '(' + data.pincode + ')';
        // console.log('DefaultAddress', addressFull);
        await AsyncStorage.setItem('@addressId', JSON.stringify(addressId))
            .then(json => {
                console.log('success!1');
                AsyncStorage.setItem('@address', JSON.stringify(addressFull))
                    .then(json => {
                        console.log('success!2', json);
                        getDefaultAddress();
                    }).catch(error => {
                        console.log('error! @address:-2 ' + error);
                    });
            }).catch(error => {
                console.log('error! @address:-1 ' + error);
            });
    }

    return (
        <View style={{ flex: 1 }}>
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
                <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16, flex: 1 }}>Address List</Text>
                <TouchableOpacity onPress={() => navigation.navigate('NewAddressScreen')} style={{ backgroundColor: '#FFFFFF', borderRadius: 100, padding: 2, }}>
                    <Text style={{ fontSize: 18, height: 20, width: 20, textAlign: 'center', fontWeight: 'bold', color: '#222222' }}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {isLoading === true ?
                    <View style={{ flex: 1, }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35, marginTop: Dimensions.get('screen').width / 1 }}>No Address Found</Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 20, alignSelf: 'center', flexDirection: 'row' }}>
                            <Text>Tap Address to make it </Text><Text style={{ fontWeight: 'bold' }}>Default Address</Text>
                        </View>
                        <FlatList
                            data={addressList}
                            keyExtractor={(items) => items.id}
                            renderItem={(items) => {
                                return (
                                    <TouchableOpacity onPress={() => saveDefaultAddress(items?.item)} style={{ padding: 0, marginHorizontal: 5, backgroundColor: '#ffffff', elevation: 5, marginBottom: 5, borderRadius: 5 }}>
                                        <Image blurRadius={2} style={{ width: '100%', height: 100, resizeMode: 'cover', }} source={require('../../assets/images/demo_map.png')} />
                                        <View style={{ padding: 10, borderStyle: 'dashed', borderWidth: defaultAddressId === items?.item?.id ? 1 : 0, borderColor: '#000000' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000', textTransform: 'capitalize' }}>{items?.item?.first_name} {items?.item?.last_name}</Text>
                                            <Text numberOfLines={2} style={{ width: '80%' }}>{items?.item?.address}</Text>
                                            <Text style={{}}>{items?.item?.state}, {items?.item?.city}, {items?.item?.country}, {items?.item?.pincode}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                }
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

export default AddressListScreen;