const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,

        },
        first_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.INTEGER
        },
        localityId: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        userType: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: false,
        }
    );

};

