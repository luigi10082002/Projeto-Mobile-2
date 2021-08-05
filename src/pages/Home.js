import React from 'react';
import { View, KeyboardAvoidingView, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export function Home() {
  const navigation = useNavigation();
  async function readCode() {
    

    navigation.navigate('QRcode');
  }

  async function modOne() {
    

    navigation.navigate('PMod');
  }

  async function modTwo() {
    

    navigation.navigate('SMod');
  }


  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>

      <View style={styles.form}>
        
      <Text style={styles.text}>Olá</Text>

      <TouchableOpacity onPress={readCode} style={styles.buttonqr}>
          <Text style={styles.buttonText}>Scanner</Text>
        </TouchableOpacity>
      

        <TouchableOpacity onPress={modOne} style={styles.buttonone}>
          <Text style={styles.buttonText}>Mod 1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={modTwo} style={styles.buttontwo}>
          <Text style={styles.buttonText}>Mod 2</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  text: {
    width: 68,
    height: 76,
    marginTop: 50,
    marginLeft: 10,
    fontSize: 30,
  },

  button: {
    height: 28,
    width: 95,
    backgroundColor: '#4B7DFE',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 13,
    marginLeft: 222,
    marginTop: 79,
  },
  buttonqr: {
    height: 28,
    width: 95,
    backgroundColor: '#4B7DFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginLeft: 222,
    marginTop: 60,
  },
  buttonone: {
    height: 26,
    width: 115,
    backgroundColor: '#4B7DFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginLeft: 42,
    marginTop: 189,
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  buttontwo: {
    height: 26,
    width: 115,
    backgroundColor: '#4B7DFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginRight: 43,
    marginTop: 20,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 10,
  },
});

export default Home;
