import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Home from './components/Home';
import Home2 from './components/Home2';
import Bookmark from './components/Bookmark';
import { AppPermission } from './components/AppPermission';

const Tab = createMaterialTopTabNavigator();

function App () {
    useEffect(async ()=>{
      await AppPermission()
    },[]) 

    const scrollA = useRef(new Animated.Value(0)).current;
    return (
      <Animated.ScrollView       
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        //scrollEventThrottle={16}
      >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route})=> ({
              tabBarIcon: ({focused, size, color}) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName= 'home';
                  size=focused ? 25 : 20;
                } else if (route.name === 'Bookmark') {
                  iconName= 'bookmark';
                  size=focused ? 25 : 20;
                } else if (route.name === 'Home2') {
                  iconName= 'bolt';
                  size=focused ? 25 : 20;
                } 
                return (
                  <FontAwesome5
                    name={iconName}
                    size={size}
                    color={color}
                  />
                )
              }
            })}
            tabBarOptions = {{
              activeTintColor: '#0080ff',
              inactiveTintColor: '#555',
              activeBackgroundColor: '#fff',
              inactiveBackgroundColor: '#999',
              showLabel: false,
              labelStyle: { fontSize: 14 },
              showIcon: true,
              tabBarHideOnScroll: true,
            }}
            activeColor= '#f0edf6'
            inactiveColor='#3e2465'
            barStyle={{backgroundColor: '#00ffff'}}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{ tabBarBadge: 3, header: () => null}}
            />
            <Tab.Screen
              name="Bookmark"
              component={Bookmark}
            />
            <Tab.Screen
              name="Home2"
              component={Home2}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Animated.ScrollView>
    ); 
};

export default App
