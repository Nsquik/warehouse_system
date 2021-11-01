import express from 'express';
import { db } from './db/';

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/api/greeting', (req, res) => {
  const user = db.prepare('SELECT * FROM User').get();
  res.send({
    message: `Hello, ${req.query.name || 'Worlder'}!`,
    user,
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
