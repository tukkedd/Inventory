import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:'); // Example using SQLite in-memory database

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;