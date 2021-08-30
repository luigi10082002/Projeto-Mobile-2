import React, { useState } from 'react';
import { 
  View, 
  Text,  
  StyleSheet,
  FlatList} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export function Modules() {
  const [modulo, setModelo] = useState('1');
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
  
  //function setHandleMod(modelo) {
    //setModelo(modelo)
  //};

  return (
    <View style={styles.formmod}>
      <FlatList 
        data={modelos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (  
        <RectButton
          style={[
            styles.containermodulos,
            modulo === item.id && styles.containerActive
          ]}
            onPress={() => setHandleMod(item.id)}
        >
          <Text style={[
            styles.textmodulo,
            modulo === item.id  && styles.textActive
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
  );
}

const styles = StyleSheet.create({
  formmod: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    marginLeft: '13%'
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
