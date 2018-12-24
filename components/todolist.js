import React from "react";
import { FlatList, View } from "react-native";
import ItemRow from "./itemRow/itemRow";
import AddForm from "./addForm";

export default class ToDoList extends React.Component {
  state = { selected: new Map(), data: [] };

  componentDidMount() {
    this.props.storageService.initialize();
    this._refreshData();
  }

  _refreshData() {
    this.props.storageService.getItems().then(result => {
      if (result.success) {
        this.setState({
          data: result.items
        });
      }
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

  _onPressItem = id => {
    this.props.storageService.toggleDone(id).then(result => {
      if (result.success) {
        this._refreshData();
      }
    });
  };

  _onConfirmDelete = id => {
    this.props.storageService.deleteItem(id).then(result => {
      if (result.success) {
        this._refreshData();
      }
    });
  };

  _onAddItem = item => {
    this.props.storageService.addItem(item).then(result => {
      if (result.success) {
        this._refreshData();
      }
    });
  };

  _renderItem = ({ item }) => (
    <ItemRow
      id={item.id}
      onPressItem={this._onPressItem}
      onConfirmDelete={this._onConfirmDelete}
      selected={item.done === 1}
      title={item.title}
      created={item.created}
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AddForm onAddItem={this._onAddItem} />
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
