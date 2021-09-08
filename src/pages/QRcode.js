import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";

export function QRcode() {
  const navigation = useNavigation();
  const route = useRoute();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function handleBarCodeScanned({ data }) {
    setScanned(true);
    const newProd = {
      id: uuid.v4(),
      produto: data,
      qtd: 1,
    };

    const storage = await AsyncStorage.getItem("@Produtos");
    const Produto = storage ? JSON.parse(storage) : [];

    //verifica o modelo que estamos
    if (route.params.id == "2") {
      //pegamos index do produto
      const index = Produto.findIndex((element) => element.produto == data);

      //verificamos se existe o produto
      if (index >= 0) {
        //se existir adicionamos um no produto isso para o modulo 1
        Produto[index].qtd = parseInt(Produto[index].qtd) + 1;
        await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
      } else {
        //caso nao exista adicionamos na storage
        await AsyncStorage.setItem(
          "@Produtos",
          JSON.stringify([...Produto, newProd])
        );
      }

      //apos adicao exibimos a menssagem de ok
      //setamos false para nao ficar piscando sempre
      Alert.alert("Confirmação", "Produto Salva Com Sucesso", [
        {
          text: "OK",
          onPress: () => setScanned(false),
        },
      ]);
    } else {
      //se o modelo for 2
      //adicionamos uma segunda storage para o codigo de barras
      //lembrando que o modelo 2 vai a codigo mais quantidade
      await AsyncStorage.setItem("@codBarras", data);
      setScanned(false);
      navigation.navigate("PMod");
    }

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  }

  async function cancelScan() {
    if (route.params.id == 2) {
      navigation.navigate("SMod");
    } else {
      navigation.navigate("PMod");
    }
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity onPress={cancelScan} style={styles.button}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  button: {
    height: 44,
    width: 294,
    backgroundColor: "#FF0000",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: "10%",
    marginTop: "150%",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
  },
});
