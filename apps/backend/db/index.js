const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(path.join(process.cwd(), 'db/DATABASE.db'));

const db = new Database(dbPath);

module.exports = {
  db,
};
