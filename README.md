# 🧠 How to Use `sqliteAuto`

**Author:** Judex  
**License:** MIT © 2025 Judex  

---

## 📦 Installation

1. Install SQLite3 dependency:
   ```bash
   npm install sqlite3
   ```

2. Copy the `sqliteAuto.js` file into your project directory.

3. Import and initialize the library in your main file:
   ```js
   const sqliteAuto = require("./sqliteAuto");
   const db = new sqliteAuto();
   db.init("data.db");
   ```

---

## ⚙️ Basic Usage Guide

### 1. Initialize Database  
Before performing any operation, initialize your database file.  
If it doesn’t exist, it will be created automatically.

**Syntax:**  
`db.init("database_name.db");`

---

### 2. Create a Table  
Create a new table with desired columns and datatypes.

**Syntax:**  
`db.createTable("table_name", ["column definitions..."]);`

**Example:**  
`db.createTable("users", ["id INTEGER PRIMARY KEY AUTOINCREMENT", "name TEXT", "password TEXT"]);`

---

### 3. Insert Data  
Add new data into an existing table.

**Syntax:**  
`db.insertData("table_name", { column: value, column: value });`

---

### 4. Read Data  
Fetch data from a table.

**All rows:**  
`db.readData("table_name");`

**Filtered rows:**  
`db.readData("table_name", "condition");`

---

### 5. Update Data  
Modify existing records that match a condition.

**Syntax:**  
`db.updateData("table_name", { column: newValue }, "condition");`

---

### 6. Delete Data  
Remove one or more records from a table.

**Syntax:**  
`db.deleteData("table_name", "condition");`

---

### 7. Delete Entire Table  
Completely remove a table from the database.

**Syntax:**  
`db.deleteTable("table_name");`

---

### 8. Chainable Access Queries  
Use the built-in chainable query interface for cleaner data access.

**Syntax:**  
`db.accessTable("table_name").from("column").whereis("value");`

---

## ⚡ Integration with Express

You can easily use `sqliteAuto` in your Express.js API routes to handle database operations dynamically.

Typical usage:
- Initialize once at the start of your app.
- Use it to insert, read, update, and delete data within your routes.

---

## 🧱 Recommended Workflow

1. Initialize your database with `db.init()`.  
2. Create all necessary tables using `db.createTable()`.  
3. Insert initial records using `db.insertData()`.  
4. Perform read, update, and delete operations as required.  
5. Drop tables when cleaning up or resetting data with `db.deleteTable()`.

---

## ⚠️ Error Handling

- All methods include safe error handling.  
- If an invalid method or property is accessed, the library returns a descriptive error instead of crashing.  
- Errors are logged with clear messages to help identify the issue quickly.

---

## 💡 Notes

- You can manage multiple tables using a single initialized instance.  
- All methods are synchronous for simplicity and reliability.  
- The database file is automatically created if not found.  
- Works seamlessly with Node.js backends and command-line scripts.  
- Compatible with all SQLite-supported data types (`TEXT`, `INTEGER`, `REAL`, `BLOB`, etc.).

---

## 📚 Example Flow

1. Initialize database: `db.init("data.db")`  
2. Create table: `db.createTable("users", [...])`  
3. Insert data: `db.insertData("users", {...})`  
4. Read or update: `db.readData()` / `db.updateData()`  
5. Delete data: `db.deleteData()`  
6. Drop table: `db.deleteTable()`

---

## 🏁 License

**MIT License © 2025 Judex**

---

## 📬 Contact

For support, collaborations, or contributions:  
📧 **mekelachichijioke@gmail.com**
