require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME || 'root',
        password: process.env.DEV_DB_PASSWORD || '',
        database: process.env.DEV_DB_NAME || 'pern_app_jwt',
        host: process.env.DEV_DB_HOST,
        dialect: "postgres",
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "postgres"
    }
}
