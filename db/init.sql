-- Check if the database already exists
SELECT 'CREATE DATABASE todolist'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todolist');

-- Create the "todos" table
CREATE TABLE IF NOT EXISTS todo (
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
);