import React from "react";
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import { MY_BASE_URL } from '../../global';

const renderItems = (items) => {


    return (
        <View style={{
            width: Dimensions.get('screen').width / 3.4, margin: 4, backgroundColor: '#ffffff', shadowColor: '#b4b4b4',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
        }}>
            <ImageBackground style={{ padding: 10, height: 120, resizeMode: 'cover', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} resizeMode={'cover'} source={{ uri: MY_BASE_URL +'storage/'+ items.item.image }} />
            <Text style={{ textAlign: 'center', marginTop: 5, marginBottom: 5, color: 'rgb(0,0,0)', fontSize: 12, opacity: 1, fontWeight: 'bold' }}>{items.item.category_name}</Text>
        </View>
    )

}

export default renderItems;