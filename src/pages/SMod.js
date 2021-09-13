import React, { useState, useCallback } from "react";
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
  FlatList,
  AsyncStorage,
  Alert
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import uuid from "react-native-uuid"; // gerador de ip para colocar no novos produtos adicionados

import { Modules } from "../components/modules";
import { modelos } from "../lib/Modelos";
import { QrBtn } from "../components/QrBtn";
import { Header } from "../components/Header";

export function SMod() {
  const navigation = useNavigation();
  const route = useRoute();
  const paramModelo = route.params.id;
  const [codigo, setCodigo] = useState();
  const [modulo, setModelo] = useState(route.params.id);
  const [Produto, setProduto] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setModelo(paramModelo);
    }, [modulo])
  );

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  async function Confirm() {
    const newProd = {
      id: uuid.v4(),
      produto: codigo,
      qtd: 1,
    };

    //verifica se tem alguma coisa na storage se
    const storage = await AsyncStorage.getItem("@Produtos");
    const Produto = storage ? JSON.parse(storage) : [];

    const index = Produto.findIndex((element) => element.produto == codigo);

    //em vez de add no array vamos adicionar na storage

    if (index >= 0) {
      Produto[index].qtd = parseInt(Produto[index].qtd) + 1;
      await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
    } else {
      await AsyncStorage.setItem(
        "@Produtos",
        JSON.stringify([...Produto, newProd])
      );
    }

    const delet = await AsyncStorage.getItem("@Historic");
    const Historic = delet ? JSON.parse(delet) : [];

    const list = Historic.findIndex((element) => element.produto == codigo);

    //em vez de add no array vamos adicionar na storage

    if (list >= 0) {
      Historic[list].qtd = parseInt(Historic[list].qtd) + 1;
      await AsyncStorage.setItem("@Historic", JSON.stringify(Produto));
    } else {
      await AsyncStorage.setItem(
        "@Produtos",
        JSON.stringify([...Produto, newProd])
      );
    }
  }

  async function readCode() {
    navigation.navigate("QRcode", {
      screen: "QRcode",
      id: modulo,
    });
  }

  function setHandleMod(modelo) {
    setModelo(modelo);

    navigation.push("Home");

    if (modelo == 2) {
      navigation.navigate("SMod", {
        screen: "SMod",
        id: "2",
      });
    } else {
      navigation.navigate("PMod", {
        screen: "PMod",
        id: "1",
      });
    }
  }

  return (
    //MESMO PRODUTO
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header
          title="Contagem de Inventario"
          modelo={paramModelo.backScreen}
        />
        <ScrollView>
          <View style={styles.formmod}>
            <FlatList
              data={modelos}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Modules
                  title={item.name}
                  active={item.id === modulo}
                  onPress={() => setHandleMod(item.id)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.modelotList}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.text}>Código</Text>

            <View style={styles.label}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onChangeText={setCodigo}
              >
                {Produto.produto}
              </TextInput>

              <QrBtn onPress={readCode} />
            </View>

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
    width: "100%",
    textAlign: "center",
  },

  form: {
    width: "auto",
    height: "auto",
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: "5%",
  },

  formmod: {
    flexDirection: "row",
    width: "auto",
    height: "auto",
    marginLeft: "9%",
    marginTop: "20%",
  },

  text: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },

  label: {
    flexDirection: "row",
  },

  footer: {
    width: "100%",
    paddingHorizontal: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#CACACA",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    width: "90%",
    marginBottom: 20,
    borderRadius: 2,
  },

  buttoncon: {
    height: 44,
    width: 294,
    backgroundColor: "#4B7DFE",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: "3%",
    marginTop: "20%",
  },

  confirmText: {
    color: "#FFF",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default SMod;
