import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function QrBtn({ ...res }) {
  return (
    <TouchableOpacity {...res}>
      <Icon name="qrcode-scan" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 43,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#CACACA",
    width: "auto",
    height: "auto",
    borderRadius: 5,
    paddingHorizontal: 0,
  },
});

export default QrBtn;
