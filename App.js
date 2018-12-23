import React from "react";
import { StyleSheet, View } from "react-native";
import ToDoList from "./components/todolist";
import Title from "./components/title";
import StorageService from "./services/storageService";

export default class App extends React.Component {
  render() {
    const storageService = new StorageService();
    return (
      <View style={styles.container}>
        <Title />
        <ToDoList storageService={storageService} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
