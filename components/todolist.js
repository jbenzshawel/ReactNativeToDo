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
    const db = this.props.storageService.getDb();
    db.transaction(tx => {
      tx.executeSql(`select * from items`, null, (_, { rows: { _array } }) => {
        this.setState({
          data: _array
        });
        console.log(_array);
      });
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

  _onPressItem = id => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _onConfirmDelete = id => {
    this.props.storageService.deleteItem(id);
    this._refreshData();
  };

  _onAddItem = item => {
    this.props.storageService.addItem(item);
    this._refreshData();
  };

  _renderItem = ({ item }) => (
    <ItemRow
      id={item.id}
      onPressItem={this._onPressItem}
      onConfirmDelete={this._onConfirmDelete}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <View>
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
