import {ScrollView, Text, View, StyleSheet, Alert, PermissionsAndroid} from 'react-native'
import PERMISSIONS from 'react-native-permissions'

export async function AppPermission () { 
  try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
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
