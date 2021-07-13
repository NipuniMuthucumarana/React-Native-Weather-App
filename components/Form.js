import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button 
} from 'react-native';

const Form = ({ search, onSetSearch, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter city name and press search button</Text>
      <View>
        <TextInput style={styles.input} placeholder="Enter city name..." value={search} onChangeText={(val) => onSetSearch(val)} />
        <Button title="Search" onPress={onSubmit} />
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
});

export default Form;