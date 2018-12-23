import { SQLite } from "expo";

export default class StorageService {
  db;
  constructor() {
    db = SQLite.openDatabase("todo.db");
  }

  initialize() {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, done INT, title TEXT, created TEXT);"
      );
    });
  }

  getDb() {
    return db;
  }

  deleteItem(id) {
    db.transaction(tx => {
      tx.executeSql("DELETE FROM items WHERE id = ?", [id]);
    });
  }

  addItem(item) {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO items (done, title, created) VALUES (0, ?, datetime('now'));",
        [item.title]
      );
    });
  }
}
