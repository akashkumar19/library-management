import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPath = process.env.DB_PATH || "./lms.db";
export const initializeDatabase = async (path?: string) => {
  const db = await open({
    filename: path || dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
        CREATE TABLE IF NOT EXISTS borrowers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

  await db.exec(`
            CREATE TABLE IF NOT EXISTS books (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              author TEXT NOT NULL,
              genre TEXT NOT NULL,
              isbn TEXT UNIQUE NOT NULL,
              available BOOLEAN DEFAULT 1,
              borrower_id INTEGER,
              borrow_date TEXT,
              FOREIGN KEY (borrower_id) REFERENCES borrowers(id)
            )
          `);

  return db;
};
