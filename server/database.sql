CREATE DATABASE todolist;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

SELECT * from todo;

/*
$ psql -U postgres
$ \l # list databases
$ \c todolist # connect to todolist database
$ \dt # list tables in database
*/
