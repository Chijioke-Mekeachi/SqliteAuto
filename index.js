// SqliteAuto - A simple SQLite wrapper for Node.js
// Project : for fun
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

class SqliteAuto {
  constructor() {
    this.db = null;
  }

  init(dbFile) {
    if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, "");
    this.db = new sqlite3.Database(dbFile, (err) => {
      if (err) console.error("Database init error:", err.message);
      else console.log(`✅ Database '${dbFile}' initialized`);
    });
    return this;
  }

  createTable(tableName, columns = []) {
    if (!this.db) throw new Error("Database not initialized");
    if (!Array.isArray(columns) || columns.length === 0)
      throw new Error("Columns must be a non-empty array");
    const schema = columns.map((col) => `${col} TEXT`).join(", ");
    this.db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${schema})`,
      (err) => {
        if (err) console.error("Create Table Error:", err.message);
        else console.log(`✅ Table '${tableName}' created`);
      }
    );
    return this;
  }

  insert(tableName, data = {}) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const keys = Object.keys(data);
      const placeholders = keys.map(() => "?").join(",");
      const values = Object.values(data);
      this.db.run(
        `INSERT INTO ${tableName} (${keys.join(",")}) VALUES (${placeholders})`,
        values,
        function (err) {
          if (err) reject(err.message);
          else {
            console.log(`✅ Row inserted in '${tableName}' (ID ${this.lastID})`);
            resolve(this.lastID);
          }
        }
      );
    });
  }

  readAll(tableName) {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
        if (err) reject(err.message);
        else resolve(rows);
      });
    });
  }

  findBy(tableName, column, value) {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${tableName} WHERE ${column} = ?`,
        [value],
        (err, rows) => {
          if (err) reject(err.message);
          else resolve(rows);
        }
      );
    });
  }

  update(tableName, updates = {}, where = {}) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const setClause = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
      const whereClause = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(" AND ");
      const values = [...Object.values(updates), ...Object.values(where)];
      this.db.run(
        `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`,
        values,
        function (err) {
          if (err) reject(err.message);
          else {
            console.log(`✅ Updated ${this.changes} row(s) in '${tableName}'`);
            resolve(this.changes);
          }
        }
      );
    });
  }

  delete(tableName, where = {}) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const whereClause = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(" AND ");
      const values = Object.values(where);
      this.db.run(
        `DELETE FROM ${tableName} WHERE ${whereClause}`,
        values,
        function (err) {
          if (err) reject(err.message);
          else {
            console.log(`🗑️ Deleted ${this.changes} row(s) from '${tableName}'`);
            resolve(this.changes);
          }
        }
      );
    });
  }

  dropTable(tableName) {
    if (!this.db) throw new Error("Database not initialized");
    this.db.run(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
      if (err) console.error("Drop Table Error:", err.message);
      else console.log(`Table '${tableName}' dropped`);
    });
    return this;
  }

  clearTable(tableName) {
    if (!this.db) throw new Error("Database not initialized");
    this.db.run(`DELETE FROM ${tableName}`, (err) => {
      if (err) console.error("Clear Table Error:", err.message);
      else console.log(` Cleared table '${tableName}'`);
    });
    return this;
  }

  async accessTable(tableName) {
    if (!this.db) throw new Error("Database not initialized");
    const exists = await this._tableExists(tableName);
    if (!exists) throw new Error(`Table '${tableName}' does not exist`);
    const handler = {
      get: (target, prop) => {
        if (typeof target[prop] === "undefined")
          throw new Error(`Property '${prop}' does not exist`);
        return target[prop];
      },
    };
    const target = {
      from: (column) => ({
        whereis: async (value) => await this.findBy(tableName, column, value),
      }),
      all: async () => await this.readAll(tableName),
    };
    return new Proxy(target, handler);
  }

  _tableExists(tableName) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [tableName],
        (err, row) => {
          if (err) reject(err);
          else resolve(!!row);
        }
      );
    });
  }
}

module.exports = new SqliteAuto();
