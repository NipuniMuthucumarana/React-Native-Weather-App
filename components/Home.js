import React, { useState, useRef } from 'react';
import { 
  View, 
  Alert, 
  TouchableWithoutFeedback, 
  Keyboard,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getWeather } from '../store/actions/weatherActions';
import Form from './Form';
import Weather from './Weather';

export default function Home({ navigation }) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.weather);
  const scrollA = useRef(new Animated.Value(0)).current;
  

  const searchSubmitHandler = () => {
    if (search === '') {
      return Alert.alert('Validation', 'City name is required!', [{ text: 'OK' }]);
    }
    setLoading(true);
    dispatch(getWeather(search, () => setLoading(false), () => setLoading(false)));
    setSearch('');
    Keyboard.dismiss();  
  };

  return (
    <Animated.ScrollView       
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        //scrollEventThrottle={16}
    >
        <TouchableWithoutFeedback >
            <Form search={search} onSetSearch={setSearch} onSubmit={searchSubmitHandler} />  
        </TouchableWithoutFeedback> 
        <View style={{width: windowWidth, height: windowHeight}}>
            <Weather loading={loading} data={data} error={error} />
        </View>
    </Animated.ScrollView>    
   );
};

