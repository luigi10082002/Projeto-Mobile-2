import React, { useState, useCallback } from 'react';
import { Button } from 'react-native-paper';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  Text, 
  StyleSheet,
  FlatList } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export function Home() {
  const [mod, setMod] = useState('1');
  const [Prod, setProd] = useState([]);

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
   
    setProd(storage);
  }
  
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
                                mod === item.id && styles.containerActive
                            ]}
                          onPress={() => setHandleMod(item.id)}
                    >
                        <Text style={[
                            styles.textmodulo,
                            mod === item.id  && styles.textActive
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

        <FlatList
          data={Prod}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
              <Text>{item.produto}</Text>
          )}
          showsVerticalScrollIndicator={false} />


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

  modeloList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 15,
    paddingRight: 30
},

/*css do bottom modulos */
containermodutos: {
  backgroundColor: "#F0F0F0",
  width: 140,
  height: 40,   
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  marginHorizontal: 5
},
containerActive: {        
  backgroundColor: "#BDDEFD"
},
textmodulo: {
  color: "#DDE3F0",
},
textActive: {
  color: "#2F80ED",
}
  
});


export default Home;
