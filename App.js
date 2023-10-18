/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import StackNavigation from './src/routes/index';
import FlashMessage from "react-native-flash-message";
import VersionCheck from 'react-native-version-check';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
// import BackgroundTask from 'react-native-background-task'; 
import TrackPlayer, { AppKilledPlaybackBehavior } from 'react-native-track-player';
// import messaging from '@react-native-firebase/messaging';
// import { requestUserPermission, } from './notificationService';
import ForegroundHandler from './src/helper/ForegroundHandler';
import { Text, StatusBar, Alert, BackHandler, Linking, TouchableOpacity, ImageBackground, Image, Platform } from 'react-native';

const App = () => {

  const [isupdated, setisupdated] = React.useState(true);

  React.useEffect(() => {
    checkPermission();
    messageListener();
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // showAlert('Your Firebase Token is:', fcmToken);
      await AsyncStorage.setItem('@tokenKey', fcmToken)
      console.log('FCM: ' + fcmToken)
    } else {
      showAlert('Failed', 'No token received');
    }
  }

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
    } catch (error) {
      console.log("call error", error);
      // User has rejected permissions
    }
  }

  const messageListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Quiet and Background State -> Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      })
      .catch(error => console.log('failed', error));

    // Foreground State
    messaging().onMessage(async remoteMessage => {
      console.log('foreground', remoteMessage);
    });
  }

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  // React.useEffect(() => {
  //   if (Platform.OS === 'android') forceUpdate();
  //   // requestUserPermission();
  //   // Initialize Firebase messaging 
  //   // messaging().setBackgroundMessageHandler(handleBackgroundMessage);
  //   // Subscribe to token refresh events 
  //   const unsubscribe = messaging().onTokenRefresh((newToken) => {
  //     // Handle token refresh 
  //   });
  //   return () => {
  //     // Clean up the subscription when the component unmounts 
  //     unsubscribe();
  //   }; 
  // }, []);

  // const handleBackgroundMessage = async (remoteMessage) => {
  //   // Handle the background message when the app is in the background or killed state 
  //   console.log('Received background message', remoteMessage);
  //   // Trigger the background task to play the sound
  //   BackgroundTask.schedule();
  // };

  // BackgroundTask.define(async () => {
  //   // Play the sound here
  //   console.log('Received Background Task');
  //   playRingtone();
  //   // Mark the task as complete
  //   BackgroundTask.finish();
  // });

  // const playRingtone = async () => {
  //   console.log('Received:', 'PlayRingtone');
  //   await TrackPlayer.setupPlayer();
  //   await TrackPlayer.updateOptions({
  //     android: {
  //       // This is the default behavior
  //       appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
  //     }
  //   });
  //   var track = {
  //     url: 'https://createdinam.in/sounds/sound.mp3',
  //     title: 'Avaritia',
  //     artist: 'deadmau5',
  //     album: 'while(1<2)',
  //     genre: 'Progressive House, Electro House',
  //     date: '2014-05-20T07:00:00+00:00',
  //     artwork: 'https://createdinam.in/cover.png',
  //     duration: 16 // Duration in seconds
  //   };
  //   await TrackPlayer.add(track);
  //   TrackPlayer.play();
  //   console.log('playRingtone');
  // };

  // let addItem = item => {
  //   database().ref('/items').push({
  //     name: item
  //   });
  // };

  const forceUpdate = async () => {
    console.log('updateNeeded');
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      console.log('updateNeeded', JSON.stringify(updateNeeded));
      if (updateNeeded && updateNeeded.isNeeded) {
        setisupdated(false)
        Alert.alert('Please update', 'You have to update the app to continue using',
          [{
            text: 'Update',
            onPress: () => {
              Linking.openURL(updateNeeded.storeUrl);
              BackHandler.exitApp();
            }
          }
          ], { cancelable: true })
      }
      else {
        setisupdated(true)
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  if (!isupdated) {
    return <ImageBackground
      style={{ flex: 1 }}
      source={require('./src/assets/images/background.jpeg')}
      resizeMode={'repeat'}>
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain', alignSelf: 'center', marginTop: 150, tintColor: 'rgb(131,24,28)' }}
        source={require('./src/assets/images/updateImage.png')} />
      <TouchableOpacity
        style={{ alignSelf: 'center', top: -50, backgroundColor: 'rgb(131,24,28)', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10, elevation: 5 }}
        onPress={() => forceUpdate()}>
        <Text style={{ color: '#ffffff', textTransform: 'uppercase', fontWeight: 'bold' }}>Update Now</Text>
      </TouchableOpacity>
    </ImageBackground>
  } else {
    return (
      <>
        <StatusBar backgroundColor={'#222222'} />
        <ForegroundHandler />
        <StackNavigation />
        <FlashMessage position="top" />
      </>
    )
  };

};

export default App;
