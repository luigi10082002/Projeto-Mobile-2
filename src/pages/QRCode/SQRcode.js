import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/core';

export function SQRcode() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qtd, setQtd] = useState(1); 
  const [info, setInfo] = useState();

  async function cancelScan() {
      
    navigation.navigate('Home');
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('info').then(storagedInfo => {
      const ProdArray = storagedInfo.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(false);    
    
      if (type === type) {   
        setQtd(qtd+1); 
      }

      setInfo ([
        { 
          cod: data, 
          produto: type,
          qtd: qtd,
        },
      ]);
  }

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
    height: 44,
    width: 294,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '10%',
    marginTop: '150%',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
});

