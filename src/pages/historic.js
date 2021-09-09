import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import { Header } from "../components/Header";

export function Historic() {
  const [Historic, setHistoric] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Historic])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setHistoric(storage);
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <Header title={"Historico"} modelo="Home"/>
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
swiper: {
  flex: 1,
  width: "90%",
  marginLeft: "5%",
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
});

export default Historic
