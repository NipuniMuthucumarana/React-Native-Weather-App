import React, { useState, useEffect, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { 
  View, 
  Alert, 
  TouchableWithoutFeedback, 
  Keyboard,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';

import { getWeather } from '../store/actions/weatherActions';
import { getLocation } from '../store/actions/locationActions';
import Form from './Form';
import Weather from './Weather';

function Home() {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.weather);
  const { locationData, locationError } = useSelector(state => state.location);
  const config = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 3600000,
  };

  Geolocation.getCurrentPosition(
    info => {
      console.log("INFO", info)
      setLatitude(info.coords.latitude)
      setLongitude(info.coords.longitude)
    },
    error => console.log("ERROR", error),
    config,
  );

  const scrollA = useRef(new Animated.Value(0)).current;

  const searchSubmitHandler = () => {
    if (search === '') {
      return Alert.alert('Validation', 'City name is required!', [{ text: 'OK' }]);
    }
    setCurrent(false)
    setLoading(true);
    dispatch(getWeather(search, () => setLoading(false), () => setLoading(false)));
    //props.getData;
    setSearch('');
    Keyboard.dismiss();  
  };

  const getCurrentWeatherData = () => {
    setCurrent(true);
    setLoading(true);
    dispatch(getLocation(latitude, longitude, () => setLoading(false), () => setLoading(false)));
  }

  return (
    <Animated.ScrollView       
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        //scrollEventThrottle={16}
    >
        <TouchableWithoutFeedback >
            <Form search={search} onSetSearch={setSearch} onSubmit={searchSubmitHandler} getCurrentWeatherData={getCurrentWeatherData}/>  
        </TouchableWithoutFeedback> 
        <View style={{width: windowWidth, height: windowHeight}}>
          {current  ? 
            <Weather loading={loading} data={locationData} error={locationError} /> :
            <Weather loading={loading} data={data} error={error} /> 
          }
        </View>
    </Animated.ScrollView>    
   );
};

export default Home

