import React from 'react';
import {  
  Text,  
  StyleSheet} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


export function Modules({title,
  active = false,
  ...rest}) {

  return (
        <RectButton  
         style={[
            styles.containermodulos,
            active && styles.containerActive
          ]}
          {...rest}
        >
          <Text style={[
            styles.textmodulo,
            active  && styles.textActive
          ]}>
          { title }
          </Text>
        </RectButton>
  );
}

const styles = StyleSheet.create({
  

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
