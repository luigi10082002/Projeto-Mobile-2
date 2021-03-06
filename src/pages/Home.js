import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import { modelos } from "../lib/Modelos";
import AddBtn from "../components/addBtn";
import Modules from "../components/modules";

export function Home() {
  const navigation = useNavigation();

  const [modulo, setModelo] = useState("1");
  const [Produto, setProduto] = useState([]);
  const [Historic, setHistoric] = useState([]);

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

  function setHandleMod(modelo) {
    setModelo(modelo);
  }

  function plus() {
    if (modulo == 1) {
      navigation.navigate("PMod", {
        screen: "PMod",
        id: "1",
        backScreen: "Home",
      });
    } else {
      navigation.navigate("SMod", {
        screen: "SMod",
        id: "2",
        backScreen: "Home",
      });
    }
  }

  async function handleRemove(item) {
    const id = Produto.findIndex((element) => element.id == item.id);

    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não ",
        style: "cancel",
      },
      {
        text: "Sim ",
        onPress: async () => {
          Produto.splice(id, 1);
          await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
        },
      },
    ]); 
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.user}>
          <Text style={styles.txt}>Olá,</Text>
          <Text style={styles.txtuser}>User</Text>
        </View>

        <View style={styles.text}>
          <Text style={styles.one}>Em qual modelo</Text>
          <Text style={styles.two}>Você quer fazer o inventario?</Text>
        </View>

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

        <View style={styles.listaProdutos}>
          <Text style={styles.total}>Total de Produtos</Text>
          <Text style={styles.num}>{Produto.length}</Text>
        </View>

        <View style={styles.prodlist}>
          <View>
            <Text style={styles.list}>Produtos listados</Text>
          </View>
          <AddBtn onPress={plus} />
        </View>

        <View style={styles.legenda}>
          <View>
            <Text style={styles.prodlisttitle}>Produtos</Text>
          </View>
          <View>
            <Text style={styles.prodlisttitle}>Quantidade</Text>
          </View>
        </View>

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
              data={Produto}
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
                    <Text style={styles.title}>{item.produto}</Text>
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
    flex: 1,
  },

  form: {
    width: "auto",
    height: "auto",
  },

  formmod: {
    flexDirection: "row",
    width: "auto",
    height: "auto",
    marginLeft: "13%",
    marginTop: "2%",
  },

  user: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    alignContent: "space-around",
    width: "auto",
    height: "auto",
    marginTop: "18%",
    marginLeft: "5%",
  },

  txt: {
    fontSize: 30,
  },

  txtuser: {
    fontSize: 30,
    fontWeight: "bold",
  },

  text: {
    flexDirection: "column",
    direction: "ltr",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    alignContent: "flex-start",
    width: "auto",
    height: "auto",
    marginTop: "5%",
    marginLeft: "5%",
  },

  listaProdutos: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    alignContent: "space-around",
    width: "auto",
    height: "auto",
    marginLeft: "5%",
  },

  total: {
    fontWeight: "bold",
    fontSize: 18,
  },

  num: {
    fontWeight: "bold",
    fontSize: 26,
  },

  list: {
    fontSize: 15,
    marginLeft: "18%",
    alignItems: "center",
  },

  prodlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    height: "5%",
    marginRight: "90%",
  },

  modeloList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 15,
    paddingRight: 30,
  },

  legenda: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    marginTop: "5%",
  },

  legendaProdutos: {
    backgroundColor: "#BDDEFD",
    flexDirection: "row",
    borderRadius: 10,
    fontSize: 10,
    margin: "5%",
    width: "85%",
    height: "70%",
    marginTop: "2%",
  },

  //swipe
  swiper: {
    flex: 1,
    width: "90%",
    marginLeft: "5%",
  },

  containerbuttomremover: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 2,
    marginLeft: 2,
    marginRight: 2,
  },
  title: {
    flex: 1,
    marginLeft: 32,
    fontSize: 17,
    color: "#738078",
  },
  details: {
    alignItems: "flex-end",
    right: 20,
  },
  qtd: {
    marginTop: 5,
    fontSize: 16,
    color: "#738078",
    right: 5,
  },
  buttonRemove: {
    width: 100,
    height: 30,
    backgroundColor: "#E83F5B",
    marginTop: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 20,
    paddingLeft: 15,
  },

  prodlisttitle: {
    fontSize: 16,
  },

});

export default Home;
