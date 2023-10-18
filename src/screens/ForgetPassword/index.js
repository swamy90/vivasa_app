import React from 'react';
import { SafeAreaView, View, Dimensions, TextInput, TouchableOpacity, Text, Image, } from 'react-native';
// common
import CommonButton from '../../assets/common/index';
const { width } = Dimensions.get('screen');


class ForgetPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            isLoading: false,
            isArrow: true,
            value: null,
            items: ['Mr.', 'Ms.', 'Mrs.', 'Miss'],
            password: '',
            isVisiblePassowrd: false,
        }
    }

    onPress = () => {
        var self = this;
        self.setState({ isLoading: true });
        setTimeout(function () {
            self.setState({ isLoading: false });
            self.props.navigation.replace('CustomerDetailsScreen');
        }, 1000);
    }

    render() {
        return (
            <SafeAreaView>
                <TouchableOpacity onPress={this.onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ alignSelf: 'center', resizeMode: 'contain', width: 20, height: 20 }} source={require('../../assets/images/arrow.png')} />
                    <Text style={{ flex: 1, }}>Back</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginTop: 180, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 25 }}>Forgot your Password?</Text>
                    <Text style={{ fontSize: 15, marginTop: 10, }}>Enter your email to recover your password</Text>
                </View>
                <View style={{}}>
                    <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 45 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            height: 55,
                        }}>
                            <TextInput style={{ paddingLeft: 20 }} placeholder='Email' />
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <CommonButton
                            text='Send'
                            isLoader={this.state.isLoading}
                            isRightIcon={this.state.isArrow}
                            onPress={this.onPress} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

};


export default ForgetPasswordScreen;