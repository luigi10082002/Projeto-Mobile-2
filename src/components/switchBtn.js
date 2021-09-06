import React from 'react';
import { 
  Switch, 
  StyleSheet } from 'react-native';

  export default function SwitchBtn() {
    return (
      <Switch
        style={styles.switch}
      />
    );
  }
  
  const styles = StyleSheet.create({
    switch: {
      justifyContent: 'center',
      marginTop: '7%'
    },
  });
  