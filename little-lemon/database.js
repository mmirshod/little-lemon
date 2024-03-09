import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS menu_items (id integer primary key, name text, price text, category text, description text, image text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menu_items', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    const values = menuItems.map((item, index) => (
      `('${index}', '${item.name}', '${item.description.replace(/'/g, "''")}', '${item.price}', '${item.category}', '${item.image}')`
    )).join(',');
    const st = `INSERT INTO menu_items (id, name, description, price, category, image) VALUES ${values}`;
    tx.executeSql(st, [], (_, { _rows }) => {
      console.log('inserted new menu items');
    }, (_, error) => {
      console.error(`ERROR IN INSERTION TO DB: ${error}`);
    });
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      activeCategories = activeCategories.map(item => `'${item}'`).join(', ');
      const st = `SELECT * FROM menu_items WHERE name LIKE '%${query}%' AND category IN (${activeCategories})`;
      tx.executeSql(st, [],
        (_, { rows }) => (
          resolve(rows._array)
        ), (_, error) => {
          console.error('ERROR IN SQL: ', error);
        }
      );
    });
  });
}