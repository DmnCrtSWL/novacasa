const db = require('./db');

async function check() {
  try {
    const users = await db.query('SELECT id, name, whatsapp FROM users');
    console.log('Users:', users.rows);
    
    const predictions = await db.query('SELECT * FROM predictions');
    console.log('Predictions:', predictions.rows);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
