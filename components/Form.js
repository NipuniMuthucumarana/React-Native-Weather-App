import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button,
    Pressable, 
} from 'react-native';

const Form = ({ search, onSetSearch, onSubmit, getCurrentWeatherData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter city name and press search button</Text>
      <View>
        <TextInput style={styles.input} placeholder="Enter city name..." value={search} onChangeText={(val) => onSetSearch(val)} />
        <Button style={styles.button} title="Search" onPress={onSubmit} />
        <View style={{marginTop:10}}>
          <Button title="View your location weather Info" onPress={getCurrentWeatherData} />
        </View>       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin:20,
    backgroundColor: 'transparent',
    width: 350,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: 'rgba(52, 52, 52, 0.8)',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: 20,
    width: 330,
    height: 20,
    backgroundColor: '#0080ff'
  },
  text: {
    fontSize: 18,
    opacity: 0.7,
    marginLeft: 20,
    marginBottom: 20,
  }
});

export default Form;