import React, { useState, useCallback } from 'react';
import { Button } from 'react-native-paper';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  Text,  
  StyleSheet,
<<<<<<< HEAD
  FlatList,
  ScrollView, } from 'react-native';
=======
  FlatList } from 'react-native';
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export function Home() {
<<<<<<< HEAD
  const [modulo, setModelo] = useState('1');
  const [Produto, setProduto] = useState([]);
=======
  const [mod, setMod] = useState('1');
  const [Prod, setProd] = useState([]);
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
  const modelos = [
    { 
      name: 'Módulo 1', 
      id: '1'
    },
    { 
      name: 'Módulo 2', 
      id: '2'
    },
  ];

  useFocusEffect(useCallback(() => {
    loadSpots();
  },[]));

  async function loadSpots(){
        
    const response = await AsyncStorage.getItem('@Produtos');
    const storage = response ? JSON.parse(response) : [];
   
<<<<<<< HEAD
    setProduto(storage);
=======
    setProd(storage);
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
  }
  


  const navigation = useNavigation();

  function setHandleMod(modelo) {
    setModelo(modelo)
  };

  function plus() { 
    if (modulo == 1) {
      navigation.navigate('PMod');
    }

    else {
      navigation.navigate('SMod');
    }
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
                data={modelos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (  
                    <RectButton
                            style={[
                                styles.containermodutos,
<<<<<<< HEAD
                                modulo === item.id && styles.containerActive
=======
                                mod === item.id && styles.containerActive
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
                            ]}
                          onPress={() => setHandleMod(item.id)}
                    >
                        <Text style={[
                            styles.textmodulo,
<<<<<<< HEAD
                            modulo === item.id  && styles.textActive
=======
                            mod === item.id  && styles.textActive
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
                        ]}>
                            { item.name }
                        </Text>
                    </RectButton>                  
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.modelotList}
              />

        </View>
        
        <View style={styles.listaProdutos}>
          <Text style={styles.total}>Total de Produtos</Text>
          <Text style={styles.num}>{Produto.length}</Text>
        </View>

        <View style={styles.prodlist}>
          <View>
            <Text style={styles.list}>Produtos listados</Text>
            </View>
            <Button onPress={plus} style={styles.add}>
              <Text style={styles.buttonplustext}>+</Text>
            </Button>

        </View>

        {/*exemplo de listagem com storage apartir dai e com vc*/}
        <ScrollView style={styles.Produtos}>

        <View >
        <FlatList
          data={Produto}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
              <Text>{item.produto}</Text>
          )}
          showsVerticalScrollIndicator={false}/>
          Se
        </View>
<<<<<<< HEAD
        </ScrollView>

=======

        {/*exemplo de listagem com storage apartir dai e com vc*/}
        <View>
        <FlatList
          data={Prod}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
              <Text>{item.produto}</Text>
          )}
          showsVerticalScrollIndicator={false} />
        </View>
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
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
    height: 'auto',
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
    alignItems: 'center',
  },

  formmod: {
   flexDirection: 'row',
   width: 'auto',
   height: 'auto',
   marginLeft: '13%'
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
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    height: '5%',
    marginRight: '90%',
  },


  add: {
    backgroundColor: '#4B7DFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '15%',
    height: '100%',
    marginRight: '5%'
  },
  
  buttonplustext: {
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  
  /*css do bottom modulos */
containermodutos: {
<<<<<<< HEAD
  backgroundColor: "#DEDEDE",
=======
  backgroundColor: "#F0F0F0",
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
  width: 140,
  height: 40,   
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
<<<<<<< HEAD
  marginHorizontal: 5,
=======
  marginHorizontal: 5
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
},
containerActive: {        
  backgroundColor: "#BDDEFD"
},
textmodulo: {
<<<<<<< HEAD
  color: "#BBBBBB",
},
textActive: {
  color: "#2F80ED",
},

Produtos: {
  backgroundColor: '#606060',
  width: '85%',
  height: '70%',
  alignSelf: 'center',
  marginTop: '5%',
},
=======
  color: "#DDE3F0",
},
textActive: {
  color: "#2F80ED",
}
  
>>>>>>> d2c924337954a41b711f67ceef5fe22071a2465b
});


export default Home;
