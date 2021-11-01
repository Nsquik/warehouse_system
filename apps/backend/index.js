import express from 'express';
import { UserRouter } from './routes/user';
import createError from 'http-errors';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use('/api', UserRouter);

// ++++++++++++++++++
/* ERROR HANDLERS */
// ++++++++++++++++
app.use(async (_req, _res, next) => {
  next(new createError.NotFound('This route does not exist'));
});
app.use(async (err, _req, res, _next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
