CREATE TABLE IF NOT EXISTS users (
  uid TEXT PRIMARY KEY,
  display_name TEXT NOT NULL DEFAULT 'Student',
  email TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

CREATE TABLE IF NOT EXISTS attempts (
  id TEXT PRIMARY KEY,
  uid TEXT NOT NULL,
  question_id TEXT,
  question_type TEXT,
  category TEXT DEFAULT 'Uncategorized',
  subject TEXT DEFAULT 'business',
  difficulty TEXT,
  time_spent_ms INTEGER DEFAULT 0,
  user_answer TEXT DEFAULT '',
  is_correct INTEGER,
  score REAL,
  max_marks REAL,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (uid) REFERENCES users(uid)
);

CREATE INDEX IF NOT EXISTS idx_attempts_uid ON attempts(uid);
CREATE INDEX IF NOT EXISTS idx_attempts_uid_timestamp ON attempts(uid, timestamp DESC);
