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
  AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { set } from 'react-native-reanimated';
  
export function SMod() {
  const navigation = useNavigation();

  const [prod, setProd] = useState([])

  const [qtd, setQtd] = useState(0)
  const [cod, setCod] = useState()

    async function readCode() { 
      {navigation.navigate('SQRcode')};
    }

    async function Confirm() {
      const newInfo = {
        cod, 
        qtd
      }

      const index = prod.findIndex(element => element.cod == cod)

      if (index >= 0) {
        console.log(prod[index].qtd)
        prod[index].qtd = parseInt(prod[index].qtd) +1

        setProd(prod)
      }

      else {
        setProd ([...prod, newInfo])
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
