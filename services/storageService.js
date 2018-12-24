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

  getItems() {
    return new Promise((resolve, reject) => {
      try {
        db.transaction(tx => {
          tx.executeSql(
            "SELECT id, title, done, created from items",
            null,
            (_, { rows: { _array } }) => {
              resolve({ success: true, items: _array });
            }
          );
        });
      } catch {
        reject({ success: false, error: ex });
      }
    });
  }

  deleteItem(id) {
    return new Promise((resolve, reject) => {
      try {
        db.transaction(tx => {
          tx.executeSql(
            "DELETE FROM items WHERE id = ?",
            [id],
            (_, { rows: { _array } }) => {
              resolve({ success: true });
            }
          );
        });
      } catch (ex) {
        reject({ success: false, error: ex });
      }
    });
  }

  addItem(item) {
    return new Promise((resolve, reject) => {
      try {
        db.transaction(tx => {
          tx.executeSql(
            "INSERT INTO items (done, title, created) VALUES (0, ?, datetime('now'));",
            [item.title],
            (_, { rows: { _array } }) => {
              resolve({ success: true });
            }
          );
        });
      } catch (ex) {
        reject({ success: false, error: ex });
      }
    });
  }

  toggleDone(id) {
    return new Promise((resolve, reject) => {
      try {
        db.transaction(tx => {
          tx.executeSql(
            "SELECT id, title, done, created FROM items WHERE id = ?",
            [id],
            (_, { rows: { _array } }) => {
              if (_array.length > 0) {
                _array[0].done = _array[0].done === 0 ? 1 : 0;
                this.updateItem(_array[0], resolve);
              }
            }
          );
        });
      } catch (ex) {
        reject({ success: false, error: ex });
      }
    });
  }

  updateItem(item, resolve) {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE items SET title = ?, done = ? WHERE id= ?;",
        [item.title, item.done, item.id],
        (_, { rows: { _array } }) => {
          resolve({ success: true });
        }
      );
    });
  }
}
