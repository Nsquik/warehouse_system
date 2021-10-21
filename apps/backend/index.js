import express from 'express';

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/api/greeting', (req, res) => {
  res.send({
    message: `Hello, ${req.query.name || 'Worlder'}!`,
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
