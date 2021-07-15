import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator,
    ImageBackground,
    useWindowDimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    ToastAndroid,
    Toast,
    Alert} from 'react-native';

import WeatherData from './WeatherData';
import { Permission, PERMISSION_TYPE  } from './AppPermission';


const Weather = ({ loading, data, error }) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();


  if (error) {
    if(error == 'wrong latitude'){
      error = 'Permission Denied to access your current location'
      Permission.checkPermission(PERMISSION_TYPE.location)
      //ToastAndroid.show('Location permission denied !');
      //return Alert.alert('Validation', 'City name is required!', [{ text: 'OK' }]);
    } 
    return <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
    </View>;
  }

  if (!loading && !data) {
    return (
      <View style={{width: windowWidth, height: windowHeight}}>
      <ImageBackground 
      style={{width: windowWidth, height: windowHeight}}
      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslhdNZh9N7WVJ_4gubdoAMxfAbex0FmOlFg&usqp=CAU'}}
    >
      </ImageBackground>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      { loading ? <ActivityIndicator size="large" color="#00d1b2" /> : <WeatherData data={data} /> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //margin: 15,
    //paddingVertical: 20,
  },
  error: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

export default Weather;