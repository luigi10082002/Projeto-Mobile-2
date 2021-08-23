import React from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

 function settings() {

  return (
    <View style={styles.form}>
      <Text>Olá</Text>
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

export default settings;
