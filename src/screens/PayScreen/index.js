import { View, Text, SafeAreaView, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image_Files_URL, MY_BASE_URL } from '../../global';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';


export default function PayScreen({ route }) {
    console.log("route", route?.params?.address?.order_number)
    const [transId, setTransId] = React.useState('');
    const [screenShotImg, setScreenShoImage] = React.useState('');
    const navigation = useNavigation();

    const openCameraToUpload = async () => {
        console.log("inside")
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
            compressImageQuality: 0.8,
            useFrontCamera: true
        }).then(image => {
            console.log(image?.path);
            setScreenShoImage(image?.path)
            SubmitScreenshot(image?.path);
        });
    }
    const SubmitScreenshot = async (image) => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        var formdata = new FormData();
        formdata.append("screenshot", { uri: image, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });
        formdata.append("user_id", user?.user?.id);
        formdata.append("order_number", route?.params?.address?.order_number);
        formdata.append("transaction_id", transId ? transId : "");
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(MY_BASE_URL + "api/submitScreenshot", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('result in SubmitScreenshot', result)
                if (result.status) {
                    showMessage({
                        message: 'Congratulations',
                        description: result?.msg,
                        type: "success",
                    });
                    
                    navigation.navigate("HomeBottomNavigation")
                } else {
                    showMessage({
                        message: 'Sorry!',
                        description: result?.msg,
                        type: "danger",
                    });
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <SafeAreaView>
            <View style={{}}>
                <View style={{ margin: 30 }}>
                    <Text>Scan here to pay</Text>
                    <View style={{ alignSelf: 'center', marginTop: 30 }}>
                        <Image source={require('../../assets/images/scanner.jpg')} style={{ height: 300, width: 300, resizeMode: 'center' }} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', shadowColor: '#b4b4b4',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 55,
                        }}>
                            <TextInput maxLength={10} keyboardType="numeric" onChangeText={(text) => setTransId(text)} style={{ flex: 1, paddingLeft: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, }} placeholder='Enter TransactionId (Optional)' value={transId} />
                        </View>
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Text>Upload Screenshot here</Text>
                    </View>
                    <TouchableOpacity>
                        <TouchableOpacity style={{ paddingLeft: 20, backgroundColor: 'white', alignSelf: 'center', justifyContent: 'center' }} onPress={() => openCameraToUpload()}>
                            <Image source={{ uri: screenShotImg ? screenShotImg : 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg' }} style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 50, justifyContent: 'center' }} />
                            <Image source={require('../../assets/images/camera.png')} style={{ position: 'absolute', bottom: 10, left: 95, width: 25, height: 25, resizeMode: 'contain' }} />
                            {/* {screenShotImg ? (
                                <Image source={{ uri: screenShotImg }} style={{ width: 100, height: 100 }} />
                            ) : (
                                <Image source={require('../../assets/images/camera.png')} style={{ position: 'absolute', bottom: 10, right: 0, width: 25, height: 25, resizeMode: 'contain' }} />
                            )} */}
                        </TouchableOpacity>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}