import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  AsyncStorage} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid'; 

export function QRcode() {
  const navigation = useNavigation();
  const route = useRoute();

  const [modulo, setModelo] = useState(route.params.id);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function handleBarCodeScanned({ data }) {
    
    const newProd = {
      id: uuid.v4(),
      produto: data,
      qtd: 1
    };

    const storage = await AsyncStorage.getItem('@Produtos');
    const Produto = storage ? JSON.parse(storage) : [];

     alert('Confirmação', 'Produto Salva Com Sucesso',
        [
          {
            text: 'OK',
            onPress: () => setScanned(false)
          }
        ])

    const index = Produto.findIndex(element => element.produto == data);

      if(index >= 0){
        Produto[index].qtd = parseInt(Produto[index].qtd) + 1;
        await AsyncStorage.setItem('@Produtos', JSON.stringify(Produto));
      }
       else {
         await AsyncStorage.setItem('@Produtos', JSON.stringify([...Produto, newProd]));
       }

     

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  }  

    async function cancelScan({ modelo }) {
      if (modelo == 2) {
        navigation.navigate('SMod')
      }
      else {
        navigation.navigate('PMod')
      }
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

