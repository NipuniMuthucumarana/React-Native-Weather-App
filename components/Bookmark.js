import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getWeather } from '../store/actions/weatherActions';
import { 
  View, 
  Text, 
  StyleSheet, 
  useWindowDimensions, 
  FlatList,
  Animated,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';

const Bookmark = ({navigation}) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [locationData, setLocationData] = useState();
  const [loading, setLoading] = useState(false);
  const scrollA = useRef(new Animated.Value(0)).current;
  const ITEM_Size = 300;
  const dispatch = useDispatch();
  //const { data, error } = useSelector(state => state.weather);
  
  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });  
  }, []);

  const getData = async () => {
    try {
      const info = await AsyncStorage.getItem('location')
      if(info !== null) {
        setLocationData(JSON.parse(info));
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(locationData)

  return (
    <ScrollView>
        <FlatList
          keyExtractor={(items, index) => index.toString()}
          data={locationData}
          contentContainerStyle={{
            padding:20,
            paddingTop: StatusBar.currentHeight || 42
          }}
          renderItem={({item, index})=> {
            const inputRange = [
              -1,
              0,
              ITEM_Size * index,
              ITEM_Size * (index + 2)
            ]

            const scale = scrollA.interpolate({
              inputRange,
              outputRange: [1,1,1,0]
            })

            const onPress = () => {
              setLoading(true);
              dispatch(getWeather(item.City, () => setLoading(false), () => setLoading(false)));
              navigation.navigate('Home2')
            }

            return (
              <Pressable style={styles.box} onPress={onPress}>
                <Text style={styles.title}>{item.City} - {item.Country}</Text>
                <Text style={styles.text}>{item.Description}</Text>
                <Text style={styles.text}>{item.Temperature}</Text>
              </Pressable>
            );
          }}
        />

    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
      data: state.weather
  }
}

const mapDispatchToProps = dispatch => {
  return {
      data: () => dispatch(getWeather(item.City, () => setLoading(false), () => setLoading(false)))
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    //textAlign: 'center',
    //marginBottom: 20,
    marginLeft: 20,
  },
  text: {
    fontSize: 18,
    opacity: 0.7,
    marginLeft: 20,
    marginBottom: 20,
  },
  box: {
    backgroundColor:'#rgba(255,255,255,0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Bookmark)