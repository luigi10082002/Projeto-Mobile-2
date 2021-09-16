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
  AsyncStorage,
  FlatList,
  Alert
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import uuid from "react-native-uuid";

import { Modules } from "../components/modules";
import { QrBtn } from "../components/QrBtn";
import { modelos } from "../lib/Modelos";
import { Header } from "../components/Header";

export function PMod() {
  const navigation = useNavigation();
  const route = useRoute();
  const paramMod = route.params.id;

  const [qtd, setQtd] = useState(1);
  const [codigo, setCodigo] = useState();

  const data = 
    new Date().getDate()
    + '/' +
    (new Date().getMonth() + 1)
    + '/' +
    new Date().getFullYear() 

  const hora =
    new Date().getHours() 
    + ':' + 
    new Date().getMinutes() 
    + ':' + 
    new Date().getSeconds()

  const [Produto, setProduto] = useState([]);

  const [modulo, setModelo] = useState(route.params.id);

  useFocusEffect(
    useCallback(() => {
      setModelo(paramMod);
    }, [paramMod])
  );

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@codBarras");
    const storage = response ? JSON.parse(response) : [];

    setCodigo(storage);
  }

  async function readCode() {
    navigation.navigate("QRcode", {
      screen: "QRcode",
      id: modulo,
    });
  }

  async function Confirm() {
    const newProd = {
      id: uuid.v4(),
      //id de identificação do produto
      produto: codigo,
      //código do produto
      qtd: qtd,
      //quantidade do produto
      date: data,
      hora: hora
    };

    //Verifica se tem alguma coisa na storage
    const storage = await AsyncStorage.getItem("@Produtos");
    const Produto = storage ? JSON.parse(storage) : [];

    const index = Produto.findIndex((element) => element.produto == codigo);

    if (index >= 0) {
      Produto[index].qtd = parseInt(Produto[index].qtd) + parseInt(qtd);
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

    if (list >= 0) {
      Historic[list].qtd = parseInt(Historic[list].qtd) + parseInt(qtd);
      await AsyncStorage.setItem("@Historic", JSON.stringify(Produto));
    } else {
      await AsyncStorage.setItem(
        "@Historic",
        JSON.stringify([...Produto, newProd])
      );
    }
  }

  function setHandleMod(modelo) {
    setModelo(modelo);

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
    //DIFERENTES PRODUTOS
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header title="Contagem de invenatario" modelo={paramMod.backScreen} />
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
                style={styles.inputOne}
                autoCorrect={false}
                onChangeText={setCodigo}
                value={String(codigo)}
              >
                {Produto.produto}
              </TextInput>
              <QrBtn onPress={readCode} />
            </View>

            <Text style={styles.text}>Quantidade</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              onChangeText={setQtd}
            >
              {Produto.qtd}
            </TextInput>

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

  footer: {
    width: "100%",
    paddingHorizontal: 4,
  },

  label: {
    flexDirection: "row",
  },

  input: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#CACACA",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    width: "100%",
    marginBottom: 20,
    borderRadius: 2,
  },

  inputOne: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#CACACA",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    width: "87%",
    marginBottom: 20,
    borderRadius: 2,
  },

  buttoncon: {
    height: 44,
    width: 294,
    backgroundColor: "#4B7DFE",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: "5%",
    marginTop: "15%",
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

export default PMod;
