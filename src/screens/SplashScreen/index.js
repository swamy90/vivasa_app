import React from 'react';
import { View, Text, Image, SafeAreaView, ImageBackground } from 'react-native';
import CommonButton from '../../assets/common/index'; // 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {

    const navigation = useNavigation();
    const [isLogin, setIsLogin] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isArrow, setIsArrow] = React.useState(false);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            onPress();
        });
    }, [false]);

    const onPress = () => {
        setIsLoading(true)
        setTimeout(function () {
            getData();
        }, 1000);
    };

    const getData = async () => {
        try {
            let value = await AsyncStorage.getItem('@storage_Key'); // packages_Key
            let packagex = await AsyncStorage.getItem('@packages_Key'); // packages_Key
            const respnse = JSON.parse(value);
            const packages = JSON.parse(packagex);
            if (value !== null) {
                setIsLoading(false);
                console.log('getDataS', value);
                navigation.replace('HomeBottomNavigation');
            } else {
                setIsLoading(false);
                console.log('No Data Found!');
                navigation.replace('CustomerDetailsScreen');
            }
        } catch (e) {
            setIsLoading(false);
            console.log('catch', + e);
        }
    }

    return (
        <ImageBackground source={require('../../assets/images/background.jpeg')}
            style={{ width: '100%', height: '100%' }} resizeMode={'repeat'}>
            <View style={{ alignSelf: 'center' }}>
                <Image source={require('../../assets/images/vivasa_logo.png')} style={{ height: 150, width: 150, resizeMode: 'contain', marginTop: '25%', }} />
            </View>
            <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 40, fontWeight: 'bold', color: '#000000' }}>VIVASA</Text>
            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', color: '#000000', fontSize: 14 }}>Online Fashion Solution</Text>
            <View style={{ margin: 15, alignSelf: 'center', marginBottom: 20, position: 'absolute', bottom: 15 }}>
                <CommonButton
                    text='Skip'
                    isLoader={isLoading}
                    isRightIcon={isArrow}
                    onPress={() => onPress()} />
            </View>
        </ImageBackground >
    )

};

export default SplashScreen;