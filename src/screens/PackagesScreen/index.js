import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import CommonButton from '../../assets/common/index'; // 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PackagesScreen = () => {

    const navigation = useNavigation();
    const [isLogin, setIsLogin] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isArrow, setIsArrow] = React.useState(false);
    const [packages, setPackages] = React.useState([{
        id: 1,
        name: '2 month packages',
        amount: 1000
    }, {
        id: 2,
        name: '4 month packages',
        amount: 2000
    }, {
        id: 3,
        name: '6 month packages',
        amount: 5000
    }, {
        id: 4,
        name: '12 month packages',
        amount: 15000
    }]);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            // onPress();
        });
    }, [false]);

    const saveData = async (data) => {
        try {
            console.log('catch', data);
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem('@packages_Key', jsonValue);
            console.log('saved', 'packages_Key');
            navigation.replace('NotificationAlertScreen');
        } catch (e) {
            console.log('catch', + e);
        }
    }

    return (
        <View >
            <View style={{ padding: 20, backgroundColor: '#222222' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize', color: 'white' }}>Available Packages</Text>
            </View>
            <FlatList
                data={packages}
                keyExtractor={(items) => items.id}
                renderItem={(items) =>
                    <TouchableOpacity
                        onPress={() => saveData(items.item)}
                        style={{ backgroundColor: '#f2f2f2', padding: 20, marginBottom: 5, margin: 10, borderRadius: 5, elevation: 5, borderStyle: 'dotted', borderColor: 'rgb(131,24,28)', borderWidth: 1 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' }}>{items.item.name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 26, textTransform: 'uppercase' }}>{items.item.amount} ₹</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize', textAlign: 'center', padding: 5, backgroundColor: 'green', marginTop: 10, color: 'white', borderRadius: 5, elevation: 4, height: 40, lineHeight: 30 }}>Select Packages</Text>
                    </TouchableOpacity>
                }
            />
        </View >
    )

};

export default PackagesScreen;