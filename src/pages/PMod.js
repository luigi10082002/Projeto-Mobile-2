import React, { useState } from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  AsyncStorage, } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Modules } from '../components/modules';
  
export function PMod() {
  const navigation = useNavigation();

  const [prod, setProd] = useState([])
  const [qtd, setQtd] = useState(0)
  const [codigo, setCodigo] = useState()

    async function readCode() { 
      {navigation.navigate('SQRcode')};
    }

    async function Confirm() {
      const newProd = {
        id: uuid.v4(),
        //id de identificação do produto
        produto: codigo,
        //código do produto
        qtd: qtd
        //quantidade do produto 
      };

      //Verifica se tem alguma coisa na storage

      const storage = await AsyncStorage.getItem('@Produtos');
      //guarda no array produtos
      const Prod = storage ? JSON.parse(storage) : [];
      //guarda o array storage no Prod

      const index = Prod.findIndex(element => element.produto == codigo)
      //index recebe o codigo dos protudos 
      
      if(index >= 0){
         Prod[index].qtd = parseInt(Prod[index].qtd) + parseInt(qtd);
         await AsyncStorage.setItem('@Produtos', JSON.stringify(Prod));

         //soma a quantidade de produtos mais a nova quantidade de produtos caso o produto exista
      }
      else {
      await AsyncStorage.setItem('@Produtos', JSON.stringify([...Prod, newProd]));
    }
    }
  
    
    async function readCode() { 
      {navigation.navigate('PQRcode')};
    }
  
  return (
    //DIFERENTES PRODUTOS
    <SafeAreaView style={styles.container}>
          
      <KeyboardAvoidingView ebehavior={Platform.OS === "ios" ? "padding" : "height"}>

        <ScrollView>

        <Modules/>

          <View style={styles.form}>
                
            <Text style={styles.text}>Código</Text>

            <View style={styles.label}>
              <TextInput 
              style={styles.inputOne}
              autoCorrect={false}              
              onChangeText={setCodigo}
            />

              <TouchableOpacity>
              <Icon name='qrcode-scan' size={42} color={'#CACACA'}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Quantidade</Text>
              <TextInput 
              style={styles.input}
              autoCorrect={false}            
              onChangeText={setQtd}

            />
            
            <View style={styles.footer}>
                  
              <TouchableOpacity onPress={Confirm} style={styles.buttoncon}>
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>
            
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

  text: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  footer: {
    width: '100%',
    paddingHorizontal: 4
  },

  label: {
    flexDirection: 'row',
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

  inputOne: {
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
    height: 44,
    width: 294,
    backgroundColor: '#4B7DFE',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '5%',
    marginTop: '60%',
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
