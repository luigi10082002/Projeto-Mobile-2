import React from 'react';
import { View, 
  KeyboardAvoidingView, 
  Platform, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard,
  SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
  
export function PMod() {
  const navigation = useNavigation();
    
    async function readCode() { 
      {navigation.navigate('QRcode')};
    }

    async function Confirm() {
      {navigation.navigate('Home')};
    }
  
    return (
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  
          <View style={styles.form}>
            
            <TouchableOpacity onPress={readCode} style={styles.button}>
              <Text style={styles.buttonText}>Scanner</Text>
            </TouchableOpacity>
          

          <Text style={styles.label}>Código</Text>
            <TextInput
              style={styles.input}
            />

          <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
            />

            <View style={styles.footer}>
            <TouchableOpacity onPress={Confirm} style={styles.buttoncon}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
            </View>

            </View>
          
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      textAlign: 'center',
  
    },
    content: {
      flex: 1,
      width: '100%',
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

    footer: {
      width: '100%',
      marginTop: 40,
      paddingHorizontal: 20
    },

    input: {
      borderWidth: 1,
      borderColor: '#fff',
      backgroundColor: '#CACACA',
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

    buttoncon: {
      height: 56,
      backgroundColor: '#4B7DFE',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 12,
      marginRight: 8,
    },

    confirmText: {
      color: '#FFF',
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      marginLeft: 10,
      marginTop: 10,
    },
  });
  
  export default PMod;
