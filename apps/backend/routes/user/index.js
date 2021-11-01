import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
} from '../../services/user';
import createHttpError from 'http-errors';

export const UserRouter = express.Router();

const checkIfParamMiddleware = (req, res, next) => {
  const userIdParam = req.params.id;

  if (isNaN(userIdParam))
    return next(createHttpError.BadRequest('Wrong parameter'));
  const user = getUser(userIdParam);
  if (!user) return next(createHttpError.NotFound('No user with given ID'));

  req.userIdParam = userIdParam;
  req.user = user;
  next();
};

UserRouter.route('/user')
  .get(function (req, res) {
    res.send({ users: getUsers() });
  })
  .patch((req, res, next) => {
    const body = req.body;
    const id = body.id;

    if (!id) return next(createHttpError.BadRequest('ID cannot be null'));
    res.send(updateUser(id, body));
  })
  .post((req, res, next) => {
    const body = req.body;
    if (
      !body.password ||
      !body.email ||
      !body.name ||
      !body.age ||
      !body.surname
    )
      return next(createHttpError.BadRequest('Wrong parameters'));

    const { password, email, name, age, surname } = body;

    res.send(createUser({ email, password, name, age, surname }));
  });

UserRouter.route('/user/:id')
  .get(checkIfParamMiddleware, (req, res) => {
    res.send({ user: req.user });
  })
  .delete(checkIfParamMiddleware, (req, res, next) => {
    try {
      deleteUser(req.userIdParam);
      res.send({ message: `User ${req.userIdParam} deleted` });
    } catch (error) {
      return next(createHttpError.BadRequest);
    }
  });
