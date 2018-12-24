import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Layout from "./../../constants/Layout";

export default class TextField extends Component {
  showLabel = false;

  constructor(props) {
    super(props);
    showLabel = this.props.label && this.props.label.length > 0;
  }

  render() {
    const inputWidth = showLabel
      ? Layout.window.width - 100
      : Layout.window.width - 10;
    return (
      <View style={styles.container}>
        {showLabel ? (
          <Text style={styles.label}>{this.props.label}</Text>
        ) : null}
        <View style={{ width: inputWidth }}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
          />
          <Text style={styles.error}>{this.props.error}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    marginBottom: 20
  },
  label: {
    width: 75,
    height: 35,
    fontSize: 15,
    marginTop: 10,
    textAlign: "center"
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  error: {
    width: "100%",
    height: 35,
    color: "#dc3545",
    fontSize: 14,
    marginTop: 3
  }
});
