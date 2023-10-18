import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';


export default class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notification:
                [
                    { id: 1, name: 'Fresh Foods', des: '26 - 27 june on selected Fruits, Vegetables, Dry Fruits.', time: 'Just Now' },
                    { id: 1, name: 'Fresh Foods', des: '26 - 27 june on selected Fruits, Vegetables, Dry Fruits.', time: 'Just Now' },
                ]
            ,
        }
    }

    renderItems({ item }) {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5, marginBottom: 15, shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <View style={{ padding: 5, backgroundColor: 'rgb(211,247,211)', borderRadius: 55, marginRight: 14, marginTop: -20 }}>
                    <Image style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: '#4a9832' }} source={require('../../assets/images/notification.png')} />
                </View>
                <View>
                    <Text style={{ fontWeight: '800', fontSize: 15 }}>{item.name}</Text>
                    <Text numberOfLines={2} style={{ width: '75%' }}>{item.des}</Text>
                </View>
                <Text style={{ position: 'absolute', right: 10, top: 10, fontSize: 10 }}>{item.time}</Text>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ backgroundColor: 'rgb(239,244,250)', height: '100%' }}>
                    <View style={{
                        backgroundColor: 'rgb(239,244,250)',
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 20,
                        shadowColor: '#b4b4b4',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 5 }} source={require('../../assets/images/arrow.png')} />
                            <Text style={{ fontWeight: '800', fontSize: 15 }}>Back</Text>
                        </TouchableOpacity>
                        <Text style={{ flex: 1, textAlign: 'center', color: '#FFFFFF', fontSize: 16, marginRight: 30 }}>Search</Text>
                        <View>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../assets/images/notification.png')} />
                        </View>
                    </View>
                    <View style={{ padding: 10, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                            <Text style={{ flex: 1, fontWeight: '500', fontSize: 16 }}>Today</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 2, color: '#4a9832' }}>View All</Text>
                                <Image style={{ width: 12, height: 12, resizeMode: 'contain' }} source={require('../../assets/images/noti-arrow.png')} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                data={this.state.notification}
                                keyExtractor={(items) => items.id}
                                renderItem={(items) => this.renderItems(items)}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}