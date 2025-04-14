import { getDb } from '../database/db.js';

export async function findRedirectById(id) {
  const db = getDb();
  const [rows] = await db.query('SELECT target_url FROM redirects WHERE id = ?', [id]);
  return rows[0];
}

export async function createRedirect(target_url) {
  const db = getDb();
  const [result] = await db.query('INSERT INTO redirects (target_url) VALUES (?)', [target_url]);
  return result.insertId;
}