import React from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
  
  
export function historico() {
  
    return (
          <View style={styles.form}>
            <Text>Scanner</Text>
          </View>
    );
  }
  
  const styles = StyleSheet.create({
    form: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default historico;
