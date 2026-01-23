import { Pool } from 'pg';


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || undefined,
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error', err);
  } else {
    console.log('Database connected', res.rows[0]);
  }
});

export default pool;
