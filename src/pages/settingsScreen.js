import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  AsyncStorage,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "../components/Header";

function settingsScreen() {
  const navigation = useNavigation();

  const [Produto, setProduto] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  async function deleteAll() {
    Alert.alert("Remover", `Deseja remover?`, [
      {
        text: "Não ",
        style: "cancel",
      },
      {
        text: "Sim ",
        onPress: async () => {
          AsyncStorage.clear();
          setIsEnabled(false);
        },
      },
    ]);
  }

  async function setServer() {
    Alert.alert("Login", `Deseja fazer login com o banco de dados?`, [
      {
        text: "Não ",
        style: "cancel",
      },
      {
        text: "Sim ",
        onPress: async () => {
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header title={"Settings"} modelo="Home"/>
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
      <View style={styles.form}>
        <Text style={styles.text}>Sincronizar inventário</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#00ff00" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          onChange={setServer}
        />
      </View>
      <View style={styles.separador} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "75%",
    width: "100%",
  },
  form: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: "5%",
    height: "auto",
    width: "auto",
  },
  separador: {
    backgroundColor: "#000",
    width: "100%",
    height: 1,
  },
  text: {
    fontSize: 16,
    marginRight: "5%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  switch: {
    justifyContent: "center",
    marginTop: "7%",
  },
  header: {},
});

export default settingsScreen;
