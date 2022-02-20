import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Keyboard, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [textInputValue, setTextInputValue] = useState('');

  const [value, setValue] = useState('');

  const saveValue = async () => {
    if (textInputValue) {
      Keyboard.dismiss();
      AsyncStorage.setItem('text', textInputValue);
      setTextInputValue('');
      Alert.alert("Success", "Data saved successfully")
    } else {
      Alert.alert("Required", "Please fill required field");
    }
  }

  const getValue = async () => {
    AsyncStorage.getItem('text').then((value) => {
      setValue(value)
    })
  }

  const deleteValue = async () => {
    await AsyncStorage.removeItem('text');
    Alert.alert('Success', 'Store remove successfully.')
    setValue(null);
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Async Storage in React Native
        </Text>
        <TextInput
          placeholder='Enter some text'
          value={textInputValue}
          onChangeText={(data) => setTextInputValue(data)}
          underlineColorAndroid='transparent'
          style={styles.textinputStyle}
        >
        </TextInput>
        <TouchableOpacity
          onPress={saveValue}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Save Value</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={getValue}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Get Value</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={deleteValue}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Delete Value</Text>
        </TouchableOpacity>

        <Text style={styles.textStyle}>
          {value}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20
  },
  textinputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'blue',
    fontSize: 22
  },
  buttonStyle: {
    fontSize: 16,
    color: '#FFF',
    backgroundColor: 'blue',
    padding: 5,
    marginTop: 10,
    minWidth: 250,
    height: 60,
    justifyContent: 'center'
  },
  buttonTextStyle: {
    padding: 5,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 22
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 22
  }
});
