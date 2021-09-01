import React, { useState, useCallback } from 'react';
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
  AsyncStorage,
  FlatList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { Modules } from '../components/modules';
import { QrBtn } from '../components/QrBtn'
import { modelos } from '../lib/Modelos';
  
export function PMod() {
  const navigation = useNavigation();
  const route = useRoute();
  const paramMod = route.params.id;

  const [qtd, setQtd] = useState(0)
  const [codigo, setCodigo] = useState()
  const [modulo, setModelo] = useState(route.params.id);

  console.log(route.params);
  console.log(modulo);

  useFocusEffect(useCallback(() => {
    setModelo(paramMod);
  },[paramMod]));  

    async function readCode() { 
      navigation.navigate('QRcode', {
        screen: 'QRcode',
        id:modulo
      }); 
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
      const Prod = storage ? JSON.parse(storage) : [];

      const index = Prod.findIndex(element => element.produto == codigo)
      
      if(index >= 0){
         Prod[index].qtd = parseInt(Prod[index].qtd) + parseInt(qtd);
         await AsyncStorage.setItem('@Produtos', JSON.stringify(Prod));

      }
      else {
      await AsyncStorage.setItem('@Produtos', JSON.stringify([...Prod, newProd]));
    }
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
    //DIFERENTES PRODUTOS
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
              style={styles.inputOne}
              autoCorrect={false}              
              onChangeText={setCodigo}
            />
              <QrBtn
              onPress={readCode}/>
              
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
    marginTop: '10%',
  },

  formmod: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    marginLeft: '9%',
    marginTop: '20%',
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
    width: '100%',
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
    width: '87%',
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
    marginLeft: '0%',
    marginTop: '70%',
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

  export default PMod;
