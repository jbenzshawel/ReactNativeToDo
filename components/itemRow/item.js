import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class Item extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textStyle = this.props.selected ? "line-through" : "none";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 25, textDecorationLine: textStyle }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
