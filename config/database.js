const fs = require('fs');
require('dotenv').config();
const Sequelize = require('sequelize');

const ssl = process.env.PG_SSL === 'true';

const postgresConnection = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        dialectOptions: ssl ? {
            ssl: {
                require: true,
                rejectUnauthorized: true,
                ca: fs.readFileSync(process.env.PG_SSL_CA).toString(),
            }
        } : {},
        logging: false,
        define: {
            timestamps: true
        }
    }
);

const testPostgresConnection = async () => {
    try {
        await postgresConnection.authenticate();
        return true;
    } catch (error) {
        console.error('Error al conectar con PostgreSQL:', error);
        return false;
    }
};

module.exports = {
    postgresConnection,
    testPostgresConnection
};