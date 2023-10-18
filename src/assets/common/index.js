import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, ActivityIndicator, Image } from 'react-native'

const width = Dimensions.get('window').width

const CommonButton = ({ text, onPress, isLoader, isRightIcon }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.btnContainerStyle}>
                <View style={{ flex: 1 }}>
                    {isLoader === true ? <ActivityIndicator color={'#FFFFFF'} /> : <Text style={styles.btnTextStyle}> {text} </Text>}
                </View>
                <View>{isRightIcon !== true ? <Image source={require('../images/noti-arrow.png')} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 15 }} /> : null}</View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainerStyle: {
        backgroundColor: '#222222',
        paddingVertical: 18,
        width: width / 1.1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#b4b4b4',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        bottom:20
    },
    btnTextStyle: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 15,
    }
})

export default CommonButton;