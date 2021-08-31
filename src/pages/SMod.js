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
  ScrollView, 
  FlatList,
  AsyncStorage} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import uuid from 'react-native-uuid'; // gerador de ip para colocar no novos produtos adicionados

import { Modules } from '../components/modules';
import { modelos } from '../lib/Modelos';

export function SMod() {
  const navigation = useNavigation();
  const route = useRoute();
  const [prod, setProd] = useState([])
  const [codigo, setCodigo] = useState()
  const [modulo, setModelo] = useState(route.params.id);

    async function readCode() { 
      {navigation.navigate('SQRcode')};
    }

    async function Confirm() {
      const newProd = {
        id: uuid.v4(),
        produto: codigo,
        qtd: 1
      };


      //verifica se tem alguma coisa na storage se
      const storage = await AsyncStorage.getItem('@Produtos');
      const Prod = storage ? JSON.parse(storage) : [];

      const index = Prod.findIndex(element => element.produto == codigo)

      //em vez de add no array vamos adicionar na storage

      if(index >= 0){
         Prod[index].qtd  = parseInt(Prod[index].qtd)  + 1;  
         await AsyncStorage.setItem('@Produtos', JSON.stringify(Prod));
      }
      else{    
        await AsyncStorage.setItem('@Produtos', JSON.stringify([...Prod, newProd]));
      }

      console.log(index)
    }

    async function readCode() { 
      {navigation.navigate('PQRcode')};
    }

    function setHandleMod(modelo) {
      setModelo(modelo);

      if (modelo == 2) {
        
        navigation.navigate('SMod', {
          screen: 'SMod',
          id:'2'
        });
      }
      else {
        navigation.navigate('PMod', {
          screen: 'PMod',
          id:'1'
        });
      }
    };
  
return (
  //MESMO PRODUTO
  <SafeAreaView style={styles.container}>
        
    <KeyboardAvoidingView ebehavior={Platform.OS === "ios" ? "padding" : "height"}>

      <ScrollView>

      <View style={styles.formmod}>
          <FlatList 
            data={modelos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (  
                <Modules 
                  title={item.name}
                  active={item.id === modulo}
                  onPress={() => setHandleMod(item.id)}                        
                /> 
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.modelotList}
          />
        
        </View>
    
        <View style={styles.form}>
              
          <Text style={styles.text}>Código</Text>

            <View style={styles.label}>
              <TextInput 
              style={styles.input}
              autoCorrect={false}              
              onChangeText={setCodigo}
            />

              <TouchableOpacity>
                <Icon name='qrcode-scan' style={styles.icon}/>
              </TouchableOpacity>
            </View>

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
    marginTop: '10%',
  },

  formmod: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    marginLeft: '13%',
    marginTop: '20%',
  },

  text: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  label: {
    flexDirection: 'row',
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
    width: '90%',
    marginBottom: 20,
    borderRadius: 2
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
  
  confirmText: {
    color: '#FFF',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    },

    icon: {
      fontSize: 43,
      alignItems: 'flex-end',
      justifyContent: 'center',
      backgroundColor: '#CACACA',
      width:'auto',
      height:'auto',
      borderRadius: 5
    },
  });
  
  export default SMod;
