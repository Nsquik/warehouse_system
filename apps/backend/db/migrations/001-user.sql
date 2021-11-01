--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE User (
  id   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(50)    NOT NULL,
  surname VARCHAR(100)    NOT NULL,
  age INTEGER NOT NULL
);

INSERT INTO User (name, surname, age) VALUES ('Kacper', 'Kedzierski', 22);



--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
