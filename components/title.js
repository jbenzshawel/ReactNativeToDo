import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Title extends Component {
  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.text}>To Do App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#008744",
    height: 80,
    marginBottom: 10
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    fontSize: 30
  }
});
