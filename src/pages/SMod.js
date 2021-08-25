import React, { useState, useEffect } from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  ScrollView} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'; // gerador de ip para colocar no novos produtos adicion

export function SMod() {
  const navigation = useNavigation();

  const [prod, setProd] = useState([])
  const [cod, setCod] = useState()

    async function readCode() { 
      {navigation.navigate('SQRcode')};
    }

    async function Confirm() {
      const newProd = {
        id: uuid.v4(),
        produto: cod,
        qtd: 1
      };


      //verifica se tem alguma coisa na storage se
      const storage = await AsyncStorage.getItem('@Produtos');
      const Prod = storage ? JSON.parse(storage) : [];

      const index = prod.findIndex(element => element.produto == cod)

      //em ves de add no array vamos adicionar na storage
      /*if (index >= 0) {
        console.log(prod[index].qtd)
        prod[index].qtd = parseInt(prod[index].qtd) +1

        setProd(prod)
      }

      else {
        setProd ([...prod, newInfo])
      }*/

      if(index >= 0){
         Prod[index].qtd  = parseInt(Prod[index].qtd)  + 1;  
         await AsyncStorage.setItem('@Produtos', JSON.stringify(Prod));
      }else{    
        await AsyncStorage.setItem('@Produtos', JSON.stringify([...Prod, newProd]));
      }

      console.log(prod)

      //{navigation.navigate('Home')};
    }
  
return (
  //MESMO PRODUTO
  <SafeAreaView style={styles.container}>
        
    <KeyboardAvoidingView ebehavior={Platform.OS === "ios" ? "padding" : "height"}>

      <ScrollView>
    
        <View style={styles.form}>
              
          <TouchableOpacity onPress={readCode} style={styles.button}>
             <Text style={styles.buttonText}>Scanner</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Quantidade</Text>
            <TextInput 
            style={styles.input}
            autoCorrect={false}
            onChangeText={setCod}
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

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  footer: {
    width: '100%',
    paddingHorizontal: 4
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
    marginTop: '100%',
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
  
  export default SMod;
