import React from "react";
import { View, Text, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const renderTrendingItems = (items) => {

    return (
        <View style={{
            width: Dimensions.get('screen').width - 120, margin: 5, borderRadius: 10, backgroundColor: 'green'
        }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(130,206,132)', 'rgb(233,244,142)']} style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}>
                <View>
                    {/* <Text style={{ padding: 4, fontSize: 32, fontWeight: '800' }}>₹{items?.item?.priceDetails[0]?.our_price}</Text> */}
                    {/* <Text style={{ position: 'absolute', width: 130, bottom: -5, left: 0, fontSize: 10 }}>{items?.item?.priceDetails[0]?.quantity}{items?.item?.priceDetails[0]?.name} - {items?.item?.priceDetails[1]?.quantity}{items?.item?.priceDetails[1]?.name}</Text> */}
                </View>
                <View style={{ flex: 1, }}>
                    <Text style={{ textAlign: 'center' }}>{items?.item?.product_name}</Text>
                </View>
                <View>
                    <Image style={{ width: 60, height: 60, resizeMode: 'contain' }} source={{ uri: 'https://www.digi-markets.com/ggrocer/assets/' + items?.item?.product_image }} />
                </View>
            </LinearGradient>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                <View style={{ backgroundColor: 'white', flex: 1, height: 30, borderBottomLeftRadius: 10 }}>
                    <Text style={{ padding: 5, paddingLeft: 15 }}>2 hrs 25 min left | 8% sold</Text>
                </View>
                <View style={{ backgroundColor: 'rgb(95,149,65)', padding: 5, paddingLeft: 14, paddingRight: 14, height: 30, borderBottomRightRadius: 10 }}>
                    <Text style={{ fontSize: 12, color: '#fff', padding: 3, fontWeight: '700' }}>ADD</Text>
                </View>
            </View>
        </View>
    )
}

export default renderTrendingItems;