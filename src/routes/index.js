import * as React from 'react';
import { Image, } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// firebase 
import database from '@react-native-firebase/database';
// Screens.
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ContactUs from '../screens/ContactScreen';
import SalesScreen from '../screens/SalesScreen';
import MobileScreen from '../screens/MobileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScreenOTP from '../screens/ScreenOtp';
import CustomerDetailsScreen from '../screens/CustomerDetScreen';
import ForgetPasswordScreen from '../screens/ForgetPassword';
import BottomHomeScreen from '../screens/BottomHomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CategoryScreen from '../screens/CategoryScreen';
// Product details.
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AddressListScreen from '../screens/AddressListScreen';
import SearchScreen from '../screens/SearchScreen';
import OfferScreen from '../screens/OfferScreen';
import OrderHistoryScreen from '../screens/OrderHistory';
import BrandProductScreen from '../screens/BrandProductScreen';
import NewAddressScreen from '../screens/NewAddressScreen';
import PackagesScreen from '../screens/PackagesScreen';
import NotificationAlertScreen from '../screens/SendNotificationAlertScreen';
import BarcodeScannerScreen from '../screens/CodeBarcodeScanner';
import BoatChatScreen from '../screens/BoatChatScreen';
import BrandScreen from '../screens/BrandScreen';
import ProductSearch from '../screens/ProductSearch';
// Theme.
const MyTheme = {
    dark: false,
    colors: {
        primary: '#FFE473',
        secondary: '#000000',
        background: 'white',
        card: 'rgb(255, 255, 255)',
        text: '#1F1F39',
        invert_text_color: '#FAFAFA',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};
// Veriable.
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// Bottom screen.
function BottomNavigation() {

    return (
        <Tab.Navigator
            shifting={true}
            labeled={true}
            screenOptions={{
                tabBarShowLabel: false,
            }}
            sceneAnimationEnabled={false}
            barStyle={{ backgroundColor: '#eff4fa' }}
            tabBarOptions={{
                activeTintColor: '#20251e',
                inactiveTintColor: '#20251e',
                showLabel: true,
                style: {
                    borderTopColor: '#66666666',
                    backgroundColor: 'eff4fa',
                    elevation: 0,
                },
            }}>
            <Tab.Screen name="DashboardScreen" component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: () => { return 'Home' },
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image
                                style={{ width: focused ? 20 : 20, height: focused ? 20 : 20, tintColor: focused ? 'orange' : '#222222', resizeMode: 'contain' }}
                                source={require('../assets/images/home-s/home.png')}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="DeliveryScreen"
                component={ContactUs}
                options={{
                    headerShown: false,
                    tabBarLabel: () => { return 'Delivery' },
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image
                                style={{ width: focused ? 25 : 25, height: focused ? 25 : 25, tintColor: focused ? 'orange' : '#222222', resizeMode: 'contain' }}
                                source={require('../assets/images/fill_favorite.png')}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen name="Offers" component={OfferScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: () => { return 'Ekart' },
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image
                                style={{ width: 25, height: 25, tintColor: focused ? 'orange' : '#222222', resizeMode: 'contain' }}
                                source={require('../assets/images/home-s/offer.png')}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen name="Account" component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: () => { return 'Ekart' },
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image
                                style={{ width: 25, height: 25, tintColor: focused ? 'orange' : '#222222', resizeMode: 'contain' }}
                                source={require('../assets/images/home-s/account.png')}
                            />
                        );
                    },
                }}
            />

        </Tab.Navigator>
    );
}
// Stack screen.
function StackNavigation() {

    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    let addItem = item => {
        database().ref('/navigation').push({
            name: item
        });
    };


    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            theme={MyTheme}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    });
                }
                routeNameRef.current = currentRouteName;
                addItem(currentRouteName);
            }}

        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        title: 'SplashScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="ScreenOTP"
                    component={ScreenOTP}
                    options={{
                        title: 'ScreenOTP',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="MobileScreen"
                    component={MobileScreen}
                    options={{
                        title: 'MobileScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="SignupScreen"
                    component={SignupScreen}
                    options={{
                        title: 'SignupScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: 'LoginScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="CustomerDetailsScreen"
                    component={CustomerDetailsScreen}
                    options={{
                        title: 'CustomerDetailsScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="ForgetPasswordScreen"
                    component={ForgetPasswordScreen}
                    options={{
                        title: 'ForgetPasswordScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="HomeBottomNavigation"
                    component={BottomNavigation}
                    options={{
                        title: 'BottomNavigation',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="BottomHomeScreen"
                    component={BottomHomeScreen}
                    options={{
                        title: 'BottomHomeScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="NotificationScreen"
                    component={NotificationScreen}
                    options={{
                        title: 'NotificationScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="CategoryScreen"
                    component={CategoryScreen}
                    options={{
                        title: 'CategoryScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                     <Stack.Screen
                    name="ProductSearch"
                    component={ProductSearch}
                    options={{
                        title: 'ProductSearch',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="ProductDetailsScreen"
                    component={ProductDetailsScreen}
                    options={{
                        title: 'ProductDetailsScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="AddressListScreen"
                    component={AddressListScreen}
                    options={{
                        title: 'AddressListScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="CartScreen"
                    component={SalesScreen}
                    options={{
                        title: 'CartScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={{
                        title: 'SearchScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="OrderHistoryScreen"
                    component={OrderHistoryScreen}
                    options={{
                        title: 'OrderHistoryScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="BrandProductScreen"
                    component={BrandProductScreen}
                    options={{
                        title: 'BrandProductScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="NewAddressScreen"
                    component={NewAddressScreen}
                    options={{
                        title: 'NewAddressScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="PackagesScreen"
                    component={PackagesScreen}
                    options={{
                        title: 'PackagesScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="NotificationAlertScreen"
                    component={NotificationAlertScreen}
                    options={{
                        title: 'NotificationAlertScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="BarcodeScannerScreen"
                    component={BarcodeScannerScreen}
                    options={{
                        title: 'BarcodeScannerScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="BoatChatScreen"
                    component={BoatChatScreen}
                    options={{
                        title: 'BoatChatScreen',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
// Export NotificationAlertScreen.
export default StackNavigation;

