import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification, { Importance } from "react-native-push-notification";

const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage) => {
            console.log("handle in foreground", remoteMessage)
            const { notification, messageId } = remoteMessage
            console.log("handle_in_foreground", messageId)
            if (Platform.OS == 'ios') {
                PushNotificationIOS.addNotificationRequest({
                    id: messageId,
                    body: notification.body,
                    title: notification.title,
                    sound: 'ring_bell.wav'
                });
            } else {
                PushNotification.localNotification({
                    channelId: "alaram_notification",
                    id: messageId,
                    body: 'android body',
                    title: 'android notif title',
                    soundName: 'ring_bell.wav',
                    priority: 'high',
                    importance: Importance.HIGH,
                    vibrate: true,
                    playSound: true
                })
            }
        })
        return unsubscribe
    }, [])
    return null
}

export default ForegroundHandler