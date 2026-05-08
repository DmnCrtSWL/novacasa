require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { up: runMigrations001 } = require('./migrations/001_create_users');
const { up: runMigrations002 } = require('./migrations/002_add_whatsapp_to_users');
const { up: runMigrations003 } = require('./migrations/003_create_predictions');
const { up: runMigrations004 } = require('./migrations/004_add_champion_to_users');
const { up: runMigrations005 } = require('./migrations/005_add_is_admin_to_users');
const { up: runMigrations006 } = require('./migrations/006_create_matches');
const { up: runMigrations007 } = require('./migrations/007_require_email');
const { up: runMigrations008 } = require('./migrations/008_create_password_reset_tokens');
const authRoutes = require('./routes/auth');
const predictionsRoutes = require('./routes/predictions');
const matchesRoutes = require('./routes/matches');
const leaderboardRoutes = require('./routes/leaderboard');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/predictions', predictionsRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ status: 'ok', db_time: result.rows[0].now });
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

async function start() {
  try {
    await runMigrations001();
    await runMigrations002();
    await runMigrations003();
    await runMigrations004();
    await runMigrations005();
    await runMigrations006();
    await runMigrations007();
    await runMigrations008();
    console.log('Migrations applied successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start();
