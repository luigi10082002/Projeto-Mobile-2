import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'; 

export function confirmBtn() {
  async function Confirm() {
    const newProd = {
      id: uuid.v4(), 
      produto: codigo,
      qtd: 1
    };

     //verifica se tem alguma coisa na storage 
    const storage = await AsyncStorage.getItem('@Produtos');
    const Prod = storage ? JSON.parse(storage) : [];

    const index = Prod.findIndex(element => element.produto == codigo)
    
    if(index >= 0){
       Prod[index].qtd  = parseInt(Prod[index].qtd) + 1;  
       await AsyncStorage.setItem('@Produtos', JSON.stringify(Prod));
    }
    else{    
      await AsyncStorage.setItem('@Produtos', JSON.stringify([...Prod, newProd]));
    }
  }

  return (
    <View style={styles.footer}>
                
      <TouchableOpacity onPress={Confirm} style={styles.buttoncon}>
        <Text style={styles.confirmText}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingHorizontal: 4
  },

  buttoncon: {
    height: 44,
    width: 294,
    backgroundColor: '#4B7DFE',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '5%',
    marginTop: '90%',
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
})
