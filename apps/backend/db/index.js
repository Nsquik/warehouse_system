const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(path.join(process.cwd(), 'db/DATABASE.db'));
const dirPath = path.resolve(path.join(process.cwd(), 'db/'));

const db = new Database(dbPath);

const SQL = (path) => fs.readFileSync(`${dirPath}/${path}`).toString();

module.exports = {
  db,
  SQL,
};
