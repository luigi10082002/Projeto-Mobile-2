import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
  AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export function Home() {
  const [mod, setMod] = useState('1');
  const [Prod, setProd] = useState([]);
  const buttons = [
    { 
      name: 'Módulo 1', 
      id: '1'
    },
    { 
      name: 'Módulo 2', 
      id: '2'
    },
  ];

  useEffect(() => {
    async function loadSpots() {
      const prod = await AsyncStorage.getItem('prod')
     const stoge = prod? JSON.parse(prod) : [];
      setProd(stoge);
     
    }

    loadSpots();
  }, []);


  const navigation = useNavigation();

  function setHandleMod(modelo) {
    setMod(modelo)
  };

  function plus() { 
    if (mod == 1) {
      navigation.navigate('PMod');
    }

    else {
      navigation.navigate('SMod');
    }
  }

  async function List() {
    const prod = await AsyncStorage.getItem('prod')

    console.log(prod)
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
        
        <View style={styles.user}>
          <Text style={styles.txt}>Olá,</Text>
          <Text style={styles.txtuser}>User</Text>
        </View>

        <View style={styles.text}>
          <Text style={styles.one}>Em qual modelo</Text>
          <Text style={styles.two}>Você quer fazer o inventario?</Text>
        </View>

        <View style={styles.formmod}>

            <FlatList
              //horizontal={true}
              keyExtrector={item => item.id}
              data={buttons}
              renderItem={({ item }) => (
                
              <TouchableOpacity 
              onPress={() => {setHandleMod(item.id)}}
              style={styles.button}>
              <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>

              )}
            />  

        </View>
        
        <View style={styles.listaProdutos}>
          <Text style={styles.total}>Total de Produtos</Text>
          <Text style={styles.num}>{Prod.length}</Text>
        </View>

        <View style={styles.prodlist}>
          <View>
            <Text style={styles.list}>Produtos listados</Text>
          </View>

          <Button onPress={plus} style={styles.add}>
            <Text style={styles.buttonplustext}>+</Text>
          </Button> 

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  form: {
    width: 'auto',
    height: 'auto',
    
  },

  user: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    alignContent: 'space-around',
    width: 'auto',
    height: 'auto',
    marginTop: '20%',
    marginLeft: '5%',
  },

  txt: {
    fontSize: 30,
  },

  txtuser: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  text: {
    flexDirection: 'column',
    direction: 'ltr',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    width: 'auto',
    height: 'auto',
    marginTop: '5%',
    marginLeft: '5%',
  },

  listaProdutos: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    alignContent: 'space-around',
    width: 'auto',
    height: '30%',
    marginLeft: '5%',
  },

  total: {
    fontWeight: 'bold',
    fontSize: 18
  },

  num: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  
  list: {
    fontSize: 15,
    marginLeft: '24%',
    alignItems: 'stretch',
  },

  formmod: {
   flexDirection: 'row',
   width: 'auto',
   height: 'auto',
  },

  button: {
    height: '58%',
    width: '35%',
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginTop: '2%',
    marginLeft: '13%',
  },

  buttonText: {
    color: '#606060'
  },

  prodlist: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent: 'space-between',
    width: '41%',
    height: '5%',
  },

  add: {
    backgroundColor: '#4B7DFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '40%',
    height: '70%',
    marginLeft: '80%'
  },
  
  buttonplustext: {
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  
});


export default Home;
