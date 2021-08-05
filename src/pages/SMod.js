import React from 'react';
import { View, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
  
  
  export function SMod({ navigation }) {

    async function readCode() {
      
  
      {navigation.navigate('QRcode')};
    }
  
    return (
      <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
  
        <View style={styles.form}>
          
          <TouchableOpacity onPress={readCode} style={styles.button}>
            <Text style={styles.buttonText}>Scanner</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a quantidade do produto"
            laceholderTextColor="#999"

          />
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,

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
  
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      marginBottom: 20,
      borderRadius: 2
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
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 12,
      marginLeft: 10
    },
  });
  
  export default SMod;
