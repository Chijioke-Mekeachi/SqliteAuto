# sqliteAuto

**Author:** Judex  
**Email:** mekelachichijioke@gmail.com  
**License:** MIT © 2025 Judex  

## Overview
sqliteAuto is a smart, lightweight Node.js library that automates SQLite database management. It provides intuitive methods for creating tables, inserting, updating, querying, and deleting data — all in a clean, chainable API.

---

## Installation



### install locally
```bash
npm install ./sqliteAuto
```

---

## Quick Example
```js
const db = require("sqliteauto");

(async () => {
  db.init("chat.db");
  db.createTable("users", ["name", "password"]);
  await db.insert("users", { name: "john", password: "1234" });
  const data = await (await db.accessTable("users")).from("name").whereis("john");
  console.log(data);
})();
```

---

## API Reference

| Method | Description |
|--------|-------------|
| `init(dbFile)` | Initialize or create a new database file |
| `createTable(tableName, columns)` | Create a table with given columns |
| `insert(tableName, data)` | Insert a new row into the table |
| `readAll(tableName)` | Read all data from a table |
| `findBy(tableName, column, value)` | Fetch rows matching a column value |
| `update(tableName, updates, where)` | Update matching rows |
| `delete(tableName, where)` | Delete rows matching condition |
| `dropTable(tableName)` | Permanently delete a table |
| `clearTable(tableName)` | Empty table but keep structure |
| `accessTable(tableName)` | Access tables dynamically with chaining |

---

## Advanced Example
```js
const db = require("sqliteauto");

(async () => {
  db.init("company.db");
  db.createTable("employees", ["name", "role", "salary"]);

  await db.insert("employees", { name: "Alice", role: "Developer", salary: "5000" });
  await db.insert("employees", { name: "Bob", role: "Manager", salary: "7000" });

  console.log(await db.readAll("employees"));

  await db.update("employees", { salary: "5500" }, { name: "Alice" });
  console.log(await db.findBy("employees", "name", "Alice"));

  await db.delete("employees", { name: "Bob" });
  db.clearTable("employees");
  db.dropTable("employees");
})();
```

---

## Error Handling
sqliteAuto throws clear and descriptive errors for invalid method usage or missing database initialization.

---

## Contact & Support
For contributions, issues, or collaborations, reach out to:  
📧 **mekelachichijioke@gmail.com**  
🧠 Developed by **Judex**

---

## License
MIT License © 2025 Judex
