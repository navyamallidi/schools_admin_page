import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'new',
      password: 'iamnavyasri',
    });

    const [rows] = await connection.execute('SELECT * FROM schools');
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
}
