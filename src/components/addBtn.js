import React from "react";
import { Button } from "react-native-paper";
import { Text, StyleSheet } from "react-native";

export function AddBtn({ ...res }) {
  return (
    <Button {...res} style={styles.add}>
      <Text style={styles.buttonplustext}>+</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: "#4B7DFE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: 15,
    height: 25,
    marginRight: "5%",
  },

  buttonplustext: {
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});

export default AddBtn;
