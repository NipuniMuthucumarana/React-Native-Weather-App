import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ImageBackground, 
  useWindowDimensions, 
  TouchableOpacity, 
  ToastAndroid } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import SunIcon from '../assets/sun.svg';
import CloudIcon from '../assets/cloudy.svg';
import RainIcon from '../assets/rain.svg';
import Bookmark from './Bookmark';

const WeatherData = ({ data }) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  //const dispatch = useDispatch();
  // const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
  const celsius = (data.main.temp - 273.15).toFixed(2)+'\u2103';

  const  [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);

  const WeatherIcon = weatherType => {
    if (weatherType == 'clear sky') {
      return <SunIcon width={34} height={34} fill="#fff" />;
    }
    if (weatherType == 'light rain') {
      return <RainIcon width={34} height={34} fill="#fff" />;
    }
    if (weatherType == 'overcast clouds') {
      return <CloudIcon width={34} height={34} fill="#fff" />;
    }
  };

  const background = weatherType => {
    if (weatherType == 'clear sky') {
      bgImg = require('../assets/sunny.jpg');
      return bgImg;
    } else if (weatherType == 'overcast clouds'){
      bgImg = require('../assets/cloudy.jpeg');
      return bgImg;
    } else if (weatherType == 'light rain'){
      bgImg = require('../assets/rainy.jpg');
      return bgImg;
    } else if (weatherType == 'few clouds'){
      bgImg = require('../assets/cloudy.jpeg');
      return bgImg;
    } else {
      bgImg = require('../assets/cloudy.jpeg');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const info = await AsyncStorage.getItem('location')
      if(info !== null) {
        setLocation(JSON.parse(info));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addLocationhandler = async () => {  
    try {
        const weatherInfo = {
            City: data.name,
            Country: data.sys.country,
            Description: data.weather[0].description,
            Temperature: data.main.temp,
            Humidity: data.main.humidity,
            Pressure: data.main.pressure,
            Wind: data.wind.speed
        }
        const favLocations =[...location, weatherInfo]
        setLocation(favLocations)
        await AsyncStorage.setItem('location', JSON.stringify(favLocations));
        setLoading(true);
        ToastAndroid.show(
          data.name  +' is saved to bookmark', 
          ToastAndroid.LONG
        ) ;
        <Bookmark />
    } catch (error) {
      console.log(error);
    }  
}

  return (
    <View style={{width: windowWidth, height: windowHeight}}>
      <ImageBackground
        source={background(data.weather[0].description)}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 20,
          }}
        >
          <View style={styles.topInfoWrapper}>
            <View>
              <Text style={styles.city}>{data.name} - {data.sys.country}</Text>
            </View>
            <View>
              <Text style={styles.temparature}>
                {celsius}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {WeatherIcon(data.weather[0].description)}
                <Text style={styles.weatherType}>
                  {data.weather[0].description}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'rgba(255,255,255,0.7)',
              marginTop: 20,
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.bottomInfoWrapper}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.infoText}>Wind</Text>
              <Text style={[styles.infoText, {fontSize: 24}]}>
                {data.wind.speed}
              </Text>
              <Text style={styles.infoText}>m/s</Text>
              <View style={styles.infoBar}>               
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.infoText}>Pressure</Text>
              <Text style={[styles.infoText, {fontSize: 24}]}>
                {data.main.pressure}
              </Text>
              <Text style={styles.infoText}>hPa</Text>
              <View style={styles.infoBar}>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.infoText}>Humidity</Text>
              <Text style={[styles.infoText, {fontSize: 24}]}>
                {data.main.humidity}
              </Text>
              <Text style={styles.infoText}>%</Text>
              <View style={styles.infoBar}>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.appHeader}>
        <TouchableOpacity onPress={addLocationhandler}>
          <Image 
            style={styles.image}
            source={require('../assets/Plus_symbol.svg.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    position: 'absolute',
    top: 60,
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 50
  },
  topInfoWrapper: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'space-between',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    fontFamily: 'Lato-Light',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 50,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  infoBar: {
    width: 50,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorWrapper: {
    position: 'absolute',
    top: 140,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 70,
    marginLeft: 260,
    borderRadius: 35,
    backgroundColor: '#fff',
    //justifyContent: 'flex-end',
  },
});

export default WeatherData;