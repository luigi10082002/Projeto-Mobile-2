import React, { useState,useCallback } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet,
  AsyncStorage,
  Alert } from 'react-native';
  import { useNavigation, useFocusEffect } from '@react-navigation/native';

  import SwitchBtn from '../components/switchBtn';

 function settingsScreen() {

  const [Produto, setProduto] = useState([]);
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useFocusEffect(useCallback(() => {
    loadSpots();
  },[Produto]));

  async function loadSpots(){
    const response = await AsyncStorage.getItem('@Produtos');
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);

  };

  async function deleteAll() {
    alert('Deseja excluir todos os itens?')
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>  
        <Text style={styles.text}>Excluir todos os produtos</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#00ff00" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          onChange={deleteAll}
        />
      </View>
      <View style={styles.separador}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: '10%'
  },
  form: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: '5%',
  },
  separador: {
    backgroundColor: '#000',
    width: '100%',
    height: '1%',
  },
  text: {
    fontSize: 15,
    marginRight: '5%',
    marginTop: '10%',
    marginBottom: '5%',
  },
  switch: {
    justifyContent: 'center',
    marginTop: '7%'
  },
});

export default settingsScreen;
