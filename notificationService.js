import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().hasPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        if (authStatus === 1) {
            getFCMToken();
        }
    }
}

export const getFCMToken = async () => {
    let fcmToken;
    try {
        fcmToken = await messaging().getToken();
    } catch (error) {
        console.log('error FCMTOKEN', error);
    }
    return fcmToken;
};