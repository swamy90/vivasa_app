import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MY_BASE_URL } from '../../global';

const FruitsItems = (items) => {

    console.log('FruitsItems', JSON.stringify(items));

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
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', marginTop: 5, zIndex: 999 }}>
                <Text style={{ fontSize: 10, fontWeight: '800', backgroundColor: 'rgb(92,150,65)', paddingLeft: 4, paddingRight: 4, color: '#ffffff', borderRadius: 12, paddingTop: 2, paddingBottom: 2, display: 'none' }}>* {items.item.rating}</Text>
                {items.item.wishlist_status !== true ? <TouchableOpacity onPress={() => alert('Added Fav!')} style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Image style={{ width: 12, height: 12, resizeMode: 'contain' }} source={require('../../assets/images/home-s/1-1.png')} />
                </TouchableOpacity> : <TouchableOpacity onPress={() => alert('Added Fav!')} style={{ flex: 1, alignItems: 'flex-end', marginRight: 5 }}>
                    <Image style={{ width: 12, height: 12, resizeMode: 'contain' }} source={require('../../assets/images/home-s/1.png')} />
                </TouchableOpacity>}
            </View>
            <View style={{ padding: 0 }}>
                <Image style={{ height: 200, width: '100%', resizeMode: 'cover' }} source={{ uri: MY_BASE_URL + 'storage/' + items?.item?.image }} />
            </View>
            <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: '600' }}>{items.item.product_name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 10, marginRight: 10 }}>
                <Text style={{ fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>₹ {items.item.market_price}/-</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', }}>₹ {items.item.sale_price}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    {items.item.cart_status !== "No" ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'rgb(92,150,65)', borderWidth: 1.5, borderRadius: 5, marginTop: 0 }}>
                            <TouchableOpacity style={{ backgroundColor: 'rgb(235,254,226)', paddingLeft: 5, paddingRight: 5, borderRadius: 4 }}>
                                <Text style={{ color: 'green', fontSize: 9 }}>-</Text>
                            </TouchableOpacity>
                            <View style={{ backgroundColor: 'rgb(92,150,65)', paddingLeft: 5, paddingRight: 5, }}>
                                <Text style={{ color: 'white', fontSize: 10, padding: .5 }}>1</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: 'rgb(235,254,226)', paddingLeft: 5, paddingRight: 5, borderRadius: 4 }}>
                                <Text style={{ color: 'green', fontSize: 9 }}>+</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={{ backgroundColor: 'rgb(92,150,65)', padding: 2, borderRadius: 5, paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 12 }}>ADD</Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    )

}

export default FruitsItems;