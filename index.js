/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// notification
// import PushNotification from 'react-native-push-notification';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNNotificationCall from 'react-native-full-screen-notification-incoming-call';
// import messaging from '@react-native-firebase/messaging';

// // Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//     RNNotificationCall.displayNotification(
//         '22221a97-8eb4-4ac2-b2cf-0a3c0b9100ad',
//         null,
//         30000,
//         {
//             channelId: 'com.abc.incomingcall',
//             channelName: 'Incoming video call',
//             notificationIcon: 'ic_launcher', //mipmap
//             notificationTitle: 'Linh Vo',
//             notificationBody: 'Incoming video call',
//             answerText: 'Answer',
//             declineText: 'Decline',
//             notificationColor: 'colorAccent',
//             notificationSound: 'ring_bell',
//             // mainComponent:'MyReactNativeApp',//AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
//             // payload:{name:'Test',Body:'test'}
//         }
//     );
// });

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//     if (remoteMessage?.data && remoteMessage?.data?.eventData) {
//         const firebaseData = {
//             Actor: get(JSON.parse(remoteMessage?.data?.eventData), "Actor", null),
//             Body: get(JSON.parse(remoteMessage?.data?.eventData), "Body", null),
//             Title: get(JSON.parse(remoteMessage?.data?.eventData), "Title", null),
//             DeviceId: get(
//                 JSON.parse(remoteMessage?.data?.eventData),
//                 "DeviceId",
//                 null,
//             ),
//             ProfileImageUrl: get(
//                 JSON.parse(remoteMessage?.data?.eventData),
//                 "ProfileImageUrl",
//                 null,
//             ),
//             EventType: getEventType(
//                 get(JSON.parse(remoteMessage?.data?.eventData), "EventType", 0)
//             ),
//             PendantEventType: getPendantEventType(
//                 get(JSON.parse(remoteMessage?.data?.eventData), "PendantEventType", 3)
//             ),
//         };
//         if (firebaseData.Title === "FORCE LOGOFF") {
//             onNotification(null, true);
//         }
//         if (
//             firebaseData.Title === "FALL DETECTED" ||
//             firebaseData.Title === "EMERGENCY"
//         ) {
//             toNavigate("homeScreen", {
//                 firebaseData: firebaseData,
//             });
//         }
//         if (firebaseData.Title === "Call Answered") {
//             toNavigate("dashboardScreen", {
//                 firebaseData: firebaseData,
//             });
//         }
//     }
// });

// messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('Notification:', remoteMessage.notification);
//     displayNotification(remoteMessage);
// });

// PushNotification.createChannel({
//     channelId: 'fcm_fallback_notification_channel', // (required)
//     channelName: 'My channel', // (required)
//     channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function.
//     importance: 4, // (optional) default: 4. Int value of the Android notification importance.
//     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
// },
//     created => console.log(`createChannel returned '${created}'`),
//     // (optional) callback returns whether the channel was created, false means it already existed.
// );

// PushNotification.channelExists('fcm_fallback_notification_channel', function (
//     exists,
// ) {
//     console.log('exists==', exists);
// });

// PushNotification.getChannels(function (channel_ids) {
//     console.log('channel_ids==', channel_ids); // ['channel_id_1']
// });

// PushNotification.configure({
//     onRegister: function (token) {
//         console.log('TOKENX:', token?.token);
//         setStorageData(token.token);
//     },
//     onNotification: function (notification) {
//         console.log('onNotification', notification);
//         RNNotificationCall.displayNotification(
//             '22221a97-8eb4-4ac2-b2cf-0a3c0b9100ad',
//             null,
//             30000,
//             {
//                 channelId: 'com.abc.incomingcall',
//                 channelName: 'Incoming video call',
//                 notificationIcon: 'ic_launcher', //mipmap
//                 notificationTitle: 'Linh Vo',
//                 notificationBody: 'Incoming video call',
//                 answerText: 'Answer',
//                 declineText: 'Decline',
//                 notificationColor: 'colorAccent',
//                 notificationSound: 'ring_bell',
//                 // mainComponent:'MyReactNativeApp',//AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
//                 // payload:{name:'Test',Body:'test'}
//             }
//         );
//     },

//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//     },

//     popInitialNotification: true,
//     requestPermissions: true,
// });

// const unsubscribe = messaging().onMessage(async remoteMessage => {
//     console.log('remoteMessage==>', remoteMessage);
//     //displayNotification(remoteMessage);
//     RNNotificationCall.displayNotification(
//         '22221a97-8eb4-4ac2-b2cf-0a3c0b9100ad',
//         null,
//         30000,
//         {
//             channelId: 'com.abc.incomingcall',
//             channelName: 'Incoming video call',
//             notificationIcon: 'ic_launcher', //mipmap
//             notificationTitle: 'Linh Vo',
//             notificationBody: 'Incoming video call',
//             answerText: 'Answer',
//             declineText: 'Decline',
//             notificationColor: 'colorAccent',
//             notificationSound: 'ring_bell',
//             notificationSound: null, //raw
//             //mainComponent:'MyReactNativeApp',//AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
//             // payload:{name:'Test',Body:'test'}
//         }
//     );
// });

// const setStorageData = async (token) => {
//     try {
//         await AsyncStorage.setItem('@tokenKey', token);
//         console.log('Saved Details');
//     } catch (e) {
//         // saving error
//         console.log('Saved Details', JSON.stringify(e));
//     }
// }

// const displayNotification = notificationData => {
//     console.log('displayNotification==', notificationData.data);
//     if (Platform.OS == 'android') {

//         // PushNotification.localNotification({
//         //     channelId: 'alaram_notification', // (required) channelId, if the channel doesn't exist, notification will not trigger. 
//         //     autoCancel: false, // (optional) default: true
//         //     largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
//         //     largeIconUrl: 'https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg', // (optional) default: undefined
//         //     smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
//         //     // bigText:
//         //     //   'My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)', // (optional) default: "message" prop
//         //     // subText: 'This is a subText', // (optional) default: none 
//         //     color: 'red', // (optional) default: system default
//         //     vibrate: true, // (optional) default: true
//         //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//         //     tag: 'some_tag', // (optional) add tag to message
//         //     group: 'group', // (optional) add group to message
//         //     groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
//         //     ongoing: false, // (optional) set whether this is an "ongoing" notification
//         //     priority: 'high', // (optional) set notification priority, default: high
//         //     visibility: 'private', // (optional) set notification visibility, default: private   
//         //     when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
//         //     usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
//         //     timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

//         //     messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

//         //     // actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
//         //     invokeApp: true,
//         //     channelId: 'fcm_fallback_notification_channel',
//         //     //   bigText: notificationData.data.body,
//         //     //   channelId: 'fcm_fallback_notification_channel', // (required)
//         //     channelName: 'My channel', // (required)
//         //     title: notificationData.data.title, // (optional)
//         //     message: notificationData.data.message, // (required)
//         //     //   userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
//         //     //   playSound: true, // (optional) default: true
//         //     //   priority: 'high',
//         // });
//     } else {
//         //   PushNotificationIOS.localNotification({
//         //     /* iOS only properties */
//         //     channelId: 'fcm_fallback_notification_channel',
//         //     channelName: 'My channel', // (required)
//         //     title: notificationData.data.title, // (optional)
//         //     message: notificationData.data.message, /// (required)
//         //     userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
//         //     playSound: true, // (optional) default: true
//         //   });
//     }
// };

LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
