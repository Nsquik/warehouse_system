--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE User (
  id   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(50)    NOT NULL,
  surname VARCHAR(100)    NOT NULL,
  age INTEGER NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL
);

INSERT INTO User (name, surname, age, email, password) VALUES ('Kacper', 'Kedzierski', 22, 'kacper.kedzierski@start-up.house', 'not_hashed_password');



--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
