import {ScrollView, Text, View, StyleSheet, Alert, PermissionsAndroid, Platform} from 'react-native'
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions'

// const PLATFORM_LOCATION_PERMISSIONS = {
//     android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
// }

// const REQUEST_PERMISSION_TYPE = {
//     location: PLATFORM_LOCATION_PERMISSIONS
// }

// const PERMISSION_TYPE = {
//     location: 'location'
// }

// class AppPermission {
//     checkPermission = async (type): Promis
// }

export async function AppPermission () { 
  try {
      let latitude, longitude
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
              'title': 'ReactNative Location Permission',
              'message': 'ReactNative App needs access to your location'
          }
      );
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
          Alert.alert('Location Permission Granted');
      } else {
          Alert.alert('Location Permission Not Granted');
      }
  } catch (error) {
      console.warn(error)
  }
}
