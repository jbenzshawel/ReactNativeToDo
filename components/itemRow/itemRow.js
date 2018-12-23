import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Item from "./item";
import Trash from "./trash";

export default class ItemRow extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Trash
          id={this.props.id}
          onConfirmDelete={this.props.onConfirmDelete}
        />
        <Item
          id={this.props.id}
          onPressItem={this.props.onPressItem}
          selected={this.props.selected}
          title={this.props.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5
  }
});
