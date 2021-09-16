import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage, TextInput, TouchableOpacity, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue } from "react-native-reanimated";
import { Entypo, Feather } from "@expo/vector-icons";

import { Header } from "../components/Header";

export function Historic() {
  const [Produto, setProduto] = useState([]);
  const [Historic, setHistoric] = useState([]);
  const [cod, setCod] = useState();

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Historic");
    const storage = response ? JSON.parse(response) : [];

    setHistoric(storage);
  }

  async function handleRemove(item) {
    const id = Historic.findIndex((element) => element.id == item.id);

    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não ",
        style: "cancel",
      },
      {
        text: "Sim ",
        onPress: async () => {
          Historic.splice(id, 1);
          await AsyncStorage.setItem("@Historic", JSON.stringify(Historic));
        },
      },
    ]); 
  }

  function Search() {
    console.log(cod)
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <Header title={"Historico"} modelo="Home"/>

      <View style={styles.filter}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          onChangeText={setCod}
          value={cod}
        >
        </TextInput>
        <TouchableOpacity style={styles.search}>
          <Entypo name="magnifying-glass" size={24} color="#000" onPress={Search}/>
        </TouchableOpacity>
      </View>

      <View style={styles.legenda}>
          <View>
            <Text style={styles.codProduto}>Produtos</Text>
          </View>
          <View>
            <Text style={styles.regProduto}>Registro</Text>
          </View>
          <View>
            <Text style={styles.qtdProduto}>Quantidade</Text>
          </View>
        </View>

        <View style={styles.form}>
        <Animated.ScrollView
          style={{
            width: "90%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 1 }}
          onScroll={scrollHandler}
          scrollEventThrottle={16} // 1000 / 60 = 16. (1 segundo / 60 que é a quantidade de frames por segundo para ter uma animação de 60 frames)
        >
          <View style={styles.swiper}>
            <FlatList
              data={Historic}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Swipeable
                  overshootRight={false}
                  renderRightActions={() => (
                    <Animated.View>
                      <View>
                        <RectButton
                          style={styles.buttonRemove}
                          onPress={(e) => {
                            handleRemove(item);
                          }}
                        >
                          <Feather name="trash" size={24} color="#FFF" />
                        </RectButton>
                      </View>
                    </Animated.View>
                  )}
                >
                  <RectButton style={styles.containerbuttomremover}>
                  <Text style={styles.codigo}>{item.produto}</Text>
                    <View style={styles.registro}>
                      <Text style={styles.hora}>{item.hora}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <View style={styles.details}>
                    <Text style={styles.qtd}>{item.qtd}</Text>
                    </View>
                  </RectButton>
                </Swipeable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Animated.ScrollView>
        </View>
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
  marginLeft: "2%",
  marginTop: "5%",
  height: "auto",
  width: "auto",
},
swiper: {
  flex: 1,
  width: "90%",
  marginLeft: "4%",
},
buttonRemove: {
  width: 100,
  height: 30,
  backgroundColor: "#E83F5B",
  marginTop: 5,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  right: 20,
  paddingLeft: 15,
},
containerbuttomremover: {
  width: "100%",
  height: 40,
  paddingVertical: 15,
  borderRadius: 5,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  marginVertical: 2,
  marginLeft: 2,
  marginRight: 2,

},
codigo: {
  width: "36%",
  height: "auto",
  fontSize: 17,
  color: "#738078",
  alignItems: "center",
  marginLeft: '5%',
},

details: {
  marginLeft: '10%',
  alignItems: 'flex-end',
  width: "23%",
  marginRight: '4%'
},

date: {
  color: "#738078",
  alignItems: "center",
  width: "100%",
  marginLeft: '10%'
},

legenda: {
  width: "auto",
  height: "auto",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 5,
  marginHorizontal: '5%',
  marginTop: "5%",
},

prodlisttitle: {
  fontSize: 14,
},
input: {
  borderColor: "#fff",
  backgroundColor: "#CACACA",
  fontSize: 16,
  color: "#444",
  height: "85%",
  width: "70%",
  marginLeft: "10%",
  marginTop: "5%",
},

filter: {
  flexDirection: 'row',
  height: '10%',
  width: 'auto',
},

search: {
  backgroundColor: "#CACACA",
  marginTop: "5%",
  height: "85%",
  width: "10%",
  paddingHorizontal: 0,
  justifyContent: "center",
  alignItems: "center",
},
registro: {
  flexDirection: 'column',
  width: "23%",
  height: "auto",
},
hora: {
  marginLeft: '15%',
  color: "#738078",
  alignItems: "center",

},
qtd: {
  color: "#738078",
  width: "50%",
  alignItems: "center",
  alignContent: 'space-between',
  fontSize: 17,
  marginRight: '5%',
},
codProduto: {
  marginLeft: '10%'
},
});

export default Historic
