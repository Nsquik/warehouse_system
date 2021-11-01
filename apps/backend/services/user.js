import { SQL, db } from '../db';

export const getUsers = () => {
  return db.prepare(SQL('read/user_all.sql')).all();
};

export const getUser = (id) => {
  return db.prepare(SQL('read/user_one.sql')).get(id);
};
