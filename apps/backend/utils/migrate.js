const path = require('path');
const fs = require('fs');

async function readMigrations(migrationPath) {
  const migrationsPath =
    migrationPath || path.join(process.cwd(), 'db/migrations');
  const location = path.resolve(migrationsPath);

  // Get the list of migration files, for example:
  //   { id: 1, name: 'initial', filename: '001-initial.sql' }
  //   { id: 2, name: 'feature', filename: '002-feature.sql' }
  const migrationFiles = await new Promise((resolve, reject) => {
    fs.readdir(location, (err, files) => {
      if (err) {
        return reject(err);
      }

      resolve(
        files
          .map((x) => x.match(/^(\d+).(.*?)\.sql$/))
          .filter((x) => x !== null)
          .map((x) => ({ id: Number(x[1]), name: x[2], filename: x[0] }))
          .sort((a, b) => Math.sign(a.id - b.id))
      );
    });
  });

  if (!migrationFiles.length) {
    throw new Error(`No migration files found in '${location}'.`);
  }

  // Get the list of migrations, for example:
  //   { id: 1, name: 'initial', filename: '001-initial.sql', up: ..., down: ... }
  //   { id: 2, name: 'feature', filename: '002-feature.sql', up: ..., down: ... }
  return Promise.all(
    migrationFiles.map(
      (migration) =>
        new Promise((resolve, reject) => {
          const filename = path.join(location, migration.filename);
          fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
              return reject(err);
            }

            const [up, down] = data.split(/^--\s+?down\b/im);

            const migrationData = migration;
            migrationData.up = up.replace(/^-- .*?$/gm, '').trim(); // Remove comments
            migrationData.down = down ? down.trim() : ''; // and trim whitespaces
            resolve(migrationData);
          });
        })
    )
  );
}

/**
 * Migrates database schema to the latest version
 */
async function migrate(db, config = {}) {
  config.force = config.force || false;
  config.table = config.table || 'migrations';

  const { force, table } = config;
  const migrations = config.migrations
    ? config.migrations
    : await readMigrations(config.migrationsPath);

  // Create a database table for migrations meta data if it doesn't exist
  await db.exec(
    `CREATE TABLE IF NOT EXISTS "${table}" (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL,
  up   TEXT    NOT NULL,
  down TEXT    NOT NULL
)`
  );
  // Get the list of already applied migrations
  let dbMigrations = await db
    .prepare(`SELECT id, name, up, down FROM "${table}" ORDER BY id ASC`)
    .all();

  // Undo migrations that exist only in the database but not in files,
  // also undo the last migration if the `force` option is enabled.
  const lastMigration = migrations[migrations.length - 1];
  for (const migration of dbMigrations
    .slice()
    .sort((a, b) => Math.sign(b.id - a.id))) {
    if (
      !migrations.some((x) => x.id === migration.id) ||
      (force && migration.id === lastMigration.id)
    ) {
      await db.exec('BEGIN');
      try {
        await db.exec(migration.down);
        await db.exec(`DELETE FROM "${table}" WHERE id = ?`, migration.id);

        await db.exec('COMMIT');
        dbMigrations = dbMigrations.filter((x) => x.id !== migration.id);
      } catch (err) {
        await db.exec('ROLLBACK');
        throw err;
      }
    } else {
      break;
    }
  }

  // Apply pending migrations
  const lastMigrationId = dbMigrations.length
    ? dbMigrations[dbMigrations.length - 1].id
    : 0;
  for (const migration of migrations) {
    if (migration.id > lastMigrationId) {
      await db.exec('BEGIN');
      try {
        await db.exec(migration.up);
        await db
          .prepare(
            `INSERT INTO "${table}" (id, name, up, down) VALUES (?, ?, ?, ?)`
          )
          .run(migration.id, migration.name, migration.up, migration.down);
        await db.exec('COMMIT');
      } catch (err) {
        await db.exec('ROLLBACK');
        throw err;
      }
    }
  }
}

module.exports = {
  migrate,
  readMigrations,
};