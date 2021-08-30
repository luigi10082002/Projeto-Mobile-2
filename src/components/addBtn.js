import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { 
  Text,  
  StyleSheet} from 'react-native';

export function AddBtn() {
  const navigation = useNavigation();

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

  function setHandleMod(modelo) {
    setModelo(modelo)
  };
  
  function plus() { 
    if (modulo == 1) {
      navigation.navigate('PMod');
    }

    else {
      navigation.navigate('SMod');
    }
  }
  
  return(
    <Button onPress={plus} style={styles.add}>
      <Text style={styles.buttonplustext}>+</Text>
    </Button>
)
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: '#4B7DFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 15,
    height: 25,
    marginRight: '5%'
},

  buttonplustext: {
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
},
})

export default AddBtn;
