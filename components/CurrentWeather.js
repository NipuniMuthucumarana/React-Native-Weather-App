import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WeatherData from './WeatherData';
import { getLocation } from '../store/actions/locationActions';


const CurrentWeather = async ({ latitude, longitude }) => {
    const dispatch = useDispatch();
    const { data, error } = useSelector(state => state.location);
    const [loading, setLoading] = useState(false);
//     useEffect(() => {
//         const getCurrentWeatherData = (latitude, longitude) => {  
             //setLoading(true); 
//             let success = await dispatch(getLocation(latitude, longitude, () => setLoading(false), () => setLoading(false)));
//  //        };
// //     }, [latitude, longitude])
//     if(success==true){
//         console.log(data)

    //}
    console.log(latitude) 
    
  return (
    <View>
      {/* { loading ? <ActivityIndicator size="large" color="#00d1b2" /> : <WeatherData data={data} /> } */}
      <Text>Hii</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default CurrentWeather;