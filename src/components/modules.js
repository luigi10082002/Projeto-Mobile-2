import React, { useState } from 'react';
import { 
  View, 
  Text,  
  StyleSheet,
  FlatList} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


export function Modules({...res, modelo}) {

  return (
        
        <RectButton
          style={[
            styles.containermodulos,
            modelo === item.id && styles.containerActive
          ]}
           {...res}
        >
          <Text style={[
            styles.textmodulo,
            modelo === item.id  && styles.textActive
          ]}>
          { item.name }
          </Text>
        </RectButton>
      
  );
}

const styles = StyleSheet.create({
  formmod: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    marginLeft: '13%',
    marginTop: '2%',
  },

  /*css do bottom modulos */
  containermodulos: {
    backgroundColor: "#DEDEDE",
    width: 140,
    height: 40,   
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
},

  containerActive: {        
    backgroundColor: "#BDDEFD"
},

  textmodulo:{
    color: "#BBBBBB",
},

  textActive: {
    color: "#2F80ED",
},

});

export default Modules;
