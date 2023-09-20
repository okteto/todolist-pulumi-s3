const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'database',
    port: 5432,
    database: 'todolist'
});

module.exports = pool;

// For most systems, the default Postgres user is postgres and a password is not required for authentication.
// https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/