import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function Header({ title, action, modelo }) {
  const navigation = useNavigation();

  function handleGoBack() {
    const tipo = modelo === "" ? "Home" : modelo;
    const screen = modelo === "PMod" ? "1" : modelo === "SMod" ? "2" : "";
    navigation.navigate("Home", {
      id: screen,
      screen: "PMod",
      backScreen: "Home",
    });
  }

  return (
    <View style={styles.container}>
      <Feather
        onPress={handleGoBack}
        name="arrow-left"
        size={24}
        color={"#fff"}
        style={{ marginTop: "7%" }}
      />

      <Text style={styles.title}>{title}</Text>

      {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "20%",
    //paddingTop: getStatusBarHeight(),
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B7DFE",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    marginTop: "7%",
  },
});
