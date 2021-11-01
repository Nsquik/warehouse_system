--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Token (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  userId      INTEGER NOT NULL,
  title       TEXT    NOT NULL,
  CONSTRAINT Token_fk_userId FOREIGN KEY (userId)
  REFERENCES User (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX Token_ix_userId ON Token (userId);




--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
