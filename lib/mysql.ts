import mysql from 'mysql2/promise'

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_USER = 'u319625572_trueautocheck',
  DB_PASSWORD = 'Trueautocheck321@',
  DB_NAME = 'u319625572_trueautocheck',
} = process.env

const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10,
})

export default pool
