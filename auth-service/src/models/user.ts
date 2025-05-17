import { pool } from '../db';
import { User } from '../types.d';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const createUser = async (email: string, hashedPassword: string): Promise<Omit<User, 'password'>> => {
  const result = await pool.query(
    `INSERT INTO users (email, password) 
     VALUES ($1, $2) 
     RETURNING id, email, created_at`,
    [email, hashedPassword]
  );
  return result.rows[0];
};
