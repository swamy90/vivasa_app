import { PermissionsAndroid } from 'react-native';

export const MY_BASE_URL = 'https://vivasa.co.in/';
export const Image_Files_URL = 'https://vivasa.co.in/storage/';
export const MY_STORAGE_URL = 'https://createdinam.in/Bussiness-Deal/public/uploads/product_image/';
export const firebaseUrl = "https://owlystore-7bf6e-default-rtdb.asia-southeast1.firebasedatabase.app/";
export const appID = "owlystore-7bf6e";
export const INPUT_RANGE_START = 0;
export const INPUT_RANGE_END = 1;
export const OUTPUT_RANGE_START = -281;
export const OUTPUT_RANGE_END = 0;
export const ANIMATION_TO_VALUE = 1;
export const ANIMATION_DURATION = 25000;
export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Owly Shop',
                'message': 'Owly Shop access to your location.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
        } else {
            console.log("location permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}