import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let db;

export async function initializeDatabase() {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  await db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await db.query(`USE \`${process.env.DB_NAME}\``);
  await db.query(`
    CREATE TABLE IF NOT EXISTS redirects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      target_url TEXT NOT NULL
    )
  `);
}

export function getDb() {
  return db;
}
