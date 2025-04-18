import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

let pool;

export async function initializeDatabase() {
  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
  });

  // Create DB and use it
  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await pool.query(`USE \`${process.env.DB_NAME}\`;`);

  // Create table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS redirects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      target_url TEXT NOT NULL
    );
  `);
}

export function getDb() {
  if (!pool) {
    throw new Error('Database connection is not initialized');
  }
  return pool;
}
