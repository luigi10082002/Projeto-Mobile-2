import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/core';


export  function QRcode() {

  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  async function cancelScan() {
      
  
    navigation.navigate('Home');
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //const num = data;
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> 
      <TouchableOpacity onPress={cancelScan} style={styles.button}>
          <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  button: {
    //height: 40,
    //width: 320,
    //backgroundColor: '#4B7DFE',
    //alignItems: 'center',
    //borderRadius: 5,
    //marginLeft: 20,
    //marginRight: 20,
    //marginBottom: 40,
    //marginTop: 605,

    height: 44,
    width: 294,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '5%',
    marginTop: '110%',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
});

