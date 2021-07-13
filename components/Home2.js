import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Weather from './Weather';

export default function Home({ navigation }) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.weather);
  const scrollA = useRef(new Animated.Value(0)).current;
  
  return (   
    <Animated.ScrollView       
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        //scrollEventThrottle={16}
      >   
        <View >
            <Weather loading={loading} data={data} error={error} />
        </View>  
      </Animated.ScrollView>    
   );
};