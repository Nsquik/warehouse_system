import express from 'express';
import { db, SQL } from './db/';
import { user_router } from './routes/user';

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/api/greeting', (req, res) => {
  const user = db.prepare('SELECT * FROM User').all();
  res.send({
    message: `Hello, ${req.query.name || ':)'}!`,
    users: user,
  });
});

app.get('/api/add', (req, res) => {
  db.prepare(SQL('create/user.sql')).run('Janek', 'Ejsmont', 44);

  res.send({
    message: 'Added',
  });
});

app.use('/api', user_router);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
