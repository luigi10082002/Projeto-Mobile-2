import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function QrBtn() {
  const navigation = useNavigation();

  async function readCode() { 
    {navigation.navigate('PQRcode')};
}

return(
  <TouchableOpacity onPress={readCode} style={styles.button}>
    <Text style={styles.buttonText}>Scanner</Text>
  </TouchableOpacity>
)
}

const styles = StyleSheet.create({
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
    marginRight: 8,
  },
})
