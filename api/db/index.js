import mysql from "mysql";

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "my_db_01",
});

export default db;
