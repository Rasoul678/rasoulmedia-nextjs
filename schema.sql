CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT false,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  provider_account_id VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_type VARCHAR(255) NOT NULL,
  access_token TEXT NOT NULL,
  token_type VARCHAR(255),
  scope TEXT,
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  blog VARCHAR(255),
  avatar_url TEXT,
  profile_url TEXT,
  repos_url TEXT,
  public_repos INTEGER,
  followers INTEGER,
  following INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE verification_tokens (
  identifier VARCHAR(255) PRIMARY KEY,
  token TEXT NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE auth_sessions (
  id SERIAL PRIMARY KEY,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  session_token TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE INDEX provider_account_id ON accounts(provider_account_id);

CREATE INDEX user_id ON accounts(user_id);

CREATE UNIQUE INDEX session_token ON auth_sessions(session_token);

CREATE UNIQUE INDEX email ON users(email);