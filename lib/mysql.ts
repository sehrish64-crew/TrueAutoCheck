import mysql from 'mysql2/promise'

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'u319625572_trueautocheck',
  DB_PASSWORD = 'Trueautocheck321@',
  DB_NAME = 'u319625572_trueautocheck',
} = process.env

console.log('\n📦 Database Configuration:')
console.log(`  Host: ${DB_HOST}`)
console.log(`  Port: ${DB_PORT}`)
console.log(`  Database: ${DB_NAME}`)

const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
})

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅ Database connection successful\n')
    conn.release()
  })
  .catch(err => {
    console.error('\n❌ DATABASE CONNECTION FAILED:')
    console.error(`   Error: ${err.message}`)
    console.error(`\n   Make sure:`)
    console.error(`   1. MySQL is running`)
    console.error(`   2. Database exists: ${DB_NAME}`)
    console.error(`   3. Credentials are correct`)
    console.error(`   4. Host is accessible: ${DB_HOST}\n`)
  })

export default pool
