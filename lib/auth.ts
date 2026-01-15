import pool from '@/lib/mysql'
import bcrypt from 'bcryptjs'

export interface AdminCredentials {
  email: string;
  password: string;
}

export async function createAdminUser(email: string, password: string) {
  const hash = bcrypt.hashSync(password, 10)
  await pool.execute('INSERT INTO users (email, password_hash, role, created_at) VALUES (?, ?, ?, NOW())', [email, hash, 'admin'])
}

export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ? AND role = ?', [email, 'admin'])
  const user = rows[0]
  if (!user) return false
  return bcrypt.compareSync(password, user.password_hash)
}

export function generateToken(email: string): string {
  return Buffer.from(`${email}:${Date.now()}`).toString('base64');
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ? AND role = ?', [email, 'admin'])
    return rows.length > 0
  } catch {
    return false;
  }
}

export function getEmailFromToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    return email || null;
  } catch {
    return null;
  }
}

export async function changeAdminPassword(email: string, currentPassword: string, newPassword: string): Promise<boolean> {
  const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ? AND role = ?', [email, 'admin'])
  const user = rows[0];
  if (!user) return false;
  if (!bcrypt.compareSync(currentPassword, user.password_hash)) {
    return false;
  }
  const hash = bcrypt.hashSync(newPassword, 10);
  await pool.execute('UPDATE users SET password_hash = ? WHERE email = ? AND role = ?', [hash, email, 'admin']);
  return true;
}
