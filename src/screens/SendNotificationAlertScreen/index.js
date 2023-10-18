import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import CommonButton from '../../assets/common/index'; // 
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { MY_BASE_URL } from '../../global';

const NotificationAlertScreen = () => {

    var data = new FormData();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isArrow, setArrow] = React.useState(false);
    const [viewDate, setViewDate] = React.useState('');
    const [viewTime, setTime] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [date, setDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [showTimePicker, setShowTimePicker] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(null);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            getCategoryData();
        });
    }, [false]);



    const sendAlertMessage = async () => {
        let value = await AsyncStorage.getItem('@storage_Key'); // packages_Key
        const respnse = JSON.parse(value);
        if (selectedValue === null) {
            showMessage({
                message: "Alert Message Scheduled",
                description: "Please, Select User to Schedule Notification",
                type: "warning",
            });
        } else {
            const originalDate = viewDate;
            const dateParts = originalDate.split('/');
            const convertedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
            console.log(convertedDate); // Output: '2023-08-06'
            console.log('sendAlertMessage', respnse?.user?.id);
            data.append('user_id', respnse?.user?.id)
            data.append('alarm_user_id', selectedValue?.id)
            data.append('date', convertedDate)
            data.append('time', viewTime)
            const URLs = MY_BASE_URL + "api/alarm-notification";
            const response = await fetch(URLs, {
                method: 'post',
                body: data
            });
            console.log('onVarifiedOTP', JSON.stringify(data));
            const posts = await response.json();
            console.log('onVarifiedOTP', JSON.stringify(posts));
            if (posts.status === true) {
                clearData();
                showMessage({
                    message: "Alert Message Scheduled",
                    description: "Congratulations, Alert Message scheduled successfully!",
                    type: "success",
                });
            } else {
                setIsLoading(false);
                showMessage({
                    message: "Invalid Login Details",
                    description: posts?.message,
                    type: "warning",
                });
            }
        }
    }

    const clearData = () => {
        setSelectedValue(null);
        setViewDate('');
        setTime('');
    }

    const changeFormet = (dateString) => {
        const dateObj = new Date(dateString);

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // Note: Month starts from 0
        const day = dateObj.getDate();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        console.log(formattedDate); // Output: 7/6/2023
        setTime(formattedTime); // Output: 7:25:5
    }

    const changeDateFormet = (dateString) => {
        const dateObj = new Date(dateString);

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // Note: Month starts from 0
        const day = dateObj.getDate();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        setViewDate(formattedDate); // Output: 7/6/2023
        // setTime(formattedTime); // Output: 7:25:5
    }

    const getCategoryData = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')
        const user = JSON.parse(value);
        console.log('addProductInCart', user?.user?.id);
        setIsLoading(true);
        const formData = new FormData();
        const URLs = MY_BASE_URL + "api/get-all-user";
        formData.append("user_id", user?.user?.id);
        const response = await fetch(URLs, {
            method: 'GET',
            // body: formData
        });
        setIsLoading(false);
        const submitCustomer = await response.json();
        console.log('submitCustomer', JSON.stringify(submitCustomer));
        if (submitCustomer.status) {
            setItems(submitCustomer?.data);
        }
    }

    const CustomDropdown = () => {

        const [isOpen, setIsOpen] = React.useState(false);

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };

        const handleOptionSelect = (value) => {
            console.log('handleOptionSelect', JSON.stringify(value));
            setSelectedValue(value);
            setIsOpen(false);
        };

        return (
            <View>
                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                    <Text>{selectedValue?.name || 'Select an option'}</Text>
                </TouchableOpacity>
                <Modal style={{ marginTop: 50, marginBottom: 50 }} visible={isOpen} transparent={true} animationType="fade">
                    <TouchableOpacity
                        onPress={toggleDropdown}
                        style={styles.overlay}
                        activeOpacity={1}
                    >
                        <ScrollView style={styles.dropdownContent}>
                            {items.map((ee) =>
                                <TouchableOpacity
                                    onPress={() => handleOptionSelect(ee)}
                                    style={styles.dropdownOption} >
                                    <Text>{ee?.name} {ee?.id}</Text>
                                    <View style={styles.saprator} />
                                </TouchableOpacity>)}
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    };

    return (
        <View >
            <View style={{ padding: 20, backgroundColor: '#222222' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize', color: 'white' }}>Notification Alert</Text>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Select User</Text>
                <View style={{ marginTop: 20 }}>
                    <CustomDropdown />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 20 }}>Select Date</Text>
                <TouchableOpacity style={{ borderBottomColor: 'rgb(131,24,28)', borderLeftColor: 'white', borderRightColor: 'white', borderTopColor: 'white', borderWidth: 1, paddingBottom: 10 }} onPress={() => setShowDatePicker(!showDatePicker)}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>{viewDate === '' ? 'Please Select Date' : viewDate}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            // Handle the selected date
                            console.log(selectedDate);
                            setShowDatePicker(false);
                            changeDateFormet(selectedDate);
                        }}
                    />
                )}
                <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 20 }}>Select Time</Text>
                <TouchableOpacity style={{ borderBottomColor: 'rgb(131,24,28)', borderLeftColor: 'white', borderRightColor: 'white', borderTopColor: 'white', borderWidth: 1, paddingBottom: 10 }} onPress={() => setShowTimePicker(!showTimePicker)}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>{viewTime === '' ? 'Please Select Time' : viewTime}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        locale="en_GB" // Use "en_GB" here 
                        display="default"
                        onChange={(event, selectedTime) => {
                            // Handle the selected date
                            console.log('showTimePicker', selectedTime);
                            setShowTimePicker(false);
                            changeFormet(selectedTime);
                        }}
                    />
                )}
                <View style={{ marginTop: 50 }}>
                    <CommonButton
                        text='Send Alert Message'
                        isLoader={isLoading}
                        isRightIcon={isArrow}
                        onPress={() => sendAlertMessage()} />
                </View>
            </View>
        </View >
    )

};

const styles = StyleSheet.create({
    dropdownButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownContent: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    dropdownOption: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    saprator: {
        width: '100%',
        height: 1,
        backgroundColor: 'grey'
    }
});

export default NotificationAlertScreen;