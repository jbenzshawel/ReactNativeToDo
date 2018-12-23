import React, { Component } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  _onPress = () => {
    const item = { title: this.state.text };
    this.props.onAddItem(item);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ text })}
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
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "33%",
    marginLeft: "33%",
    width: "33%"
  }
});
