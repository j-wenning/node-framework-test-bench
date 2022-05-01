import { Pool } from 'pg';

const { DB_URI } = process.env;

if (!DB_URI)
  throw new Error('Missing environment variable \'DB_URI\'.');

const pool = new Pool({ connectionString: DB_URI });

export const initDB = () =>
  pool.query(`
    DROP TABLE IF EXISTS test;
    CREATE TABLE test(
      id SERIAL,
      value INT
    );
  `);

export const insertValueIntoTest = async ({ value }: { value: number }) => {
  const { rows: [row] } = await pool.query<{ id: number; }>(
    'INSERT INTO test (value) VALUES ($1) RETURNING id',
    [value]
  );

  return row;
};
