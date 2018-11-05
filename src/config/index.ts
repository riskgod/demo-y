require('dotenv').config();

module.exports = {
    development: {
        username: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB_NAME,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
    },
    test: {
        username: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB_NAME,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
    },
    production: {
        username: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB_NAME,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
    },
};
