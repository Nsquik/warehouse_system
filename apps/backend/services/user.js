import { SQL, db } from '../db';

export const getUsers = () => {
  return db.prepare(SQL('read/user_all.sql')).all();
};

export const getUser = (id) => {
  return db.prepare(SQL('read/user_one.sql')).get({ id });
};

export const createUser = ({ name, surname, age, email, password }) => {
  return db
    .prepare(SQL('create/user.sql'))
    .run({ name, surname, age, email, password });
};

export const updateUser = (id, updateData) => {
  return db.prepare(SQL('update/user.sql')).run({
    id: id,
    name: updateData.name,
    surname: updateData.surname,
    age: updateData.age,
  });
};

export const deleteUser = (id) => {
  return db.prepare(SQL('delete/user.sql')).run({ id });
};
