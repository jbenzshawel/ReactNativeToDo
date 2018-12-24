import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import TextField from "./forms/textField";

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", valid: false, errorMsg: "" };
  }

  _onPress = () => {
    this._validate(() => {
      if (this.state.valid) {
        const item = { title: this.state.text };
        this.props.onAddItem(item);
        this.setState({ text: "" });
      }
    });
  };

  _onChangeText = text => {
    this.setState({ text: text });
  };

  _validate = callback => {
    if (this.state.text.length == 0) {
      this.setState(
        {
          valid: false,
          errorMsg: "Item is required"
        },
        callback
      );
    } else {
      this.setState(
        {
          valid: true,
          errorMsg: ""
        },
        callback
      );
    }
  };

  render() {
    return (
      <View>
        <TextField
          label="Item"
          error={this.state.errorMsg}
          onChangeText={this._onChangeText}
          value={this.state.text}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPress}
            title="Add Item"
            color="#008744"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: "33%",
    marginLeft: "33%",
    width: "33%"
  }
});
