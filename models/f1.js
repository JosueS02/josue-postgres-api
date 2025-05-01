const { DataTypes } = require('sequelize');


const Driver = (sequelize) => {
    return sequelize.define('Driver', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team: {
            type: DataTypes.STRING,
            allowNull: true
        },
        championshipsWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        tableName: 'drivers',
        timestamps: true
    });
};

module.exports = Driver;