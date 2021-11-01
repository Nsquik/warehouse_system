import express from 'express';
import { getUsers, getUser } from '../../services/user';

export const user_router = express.Router();

user_router.route('/user').get(function (req, res) {
  res.send({ users: getUsers() });
});

user_router.route('/user/:id').get(function (req, res) {
  const userIdParam = req.params.id;

  //   if (isNaN(userIdParam)) res.status(400).send({ error: 'Wrong param ID' });

  //   const user = getUser(userIdParam);
  //   if (!user) res.status(400).send({ error: 'No user with given ID' });

  res.status(200).send({ user: getUser(userIdParam) });
});
