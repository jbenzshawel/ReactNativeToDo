import React, { PureComponent } from "react";
import { Alert, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Trash extends PureComponent {
  _onPress = () => {
    Alert.alert(
      "Confirm Delete",
      'Are you sure you want to delete this item"?',
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => this.props.onConfirmDelete(this.props.id)
        }
      ]
    );
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ flex: 1 }}>
          <Icon
            name="trash-o"
            size={20}
            style={{ marginRight: 15, marginTop: 10, marginLeft: 5 }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
