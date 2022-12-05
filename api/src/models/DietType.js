const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('DietType', {
        name: {
            type: DataTypes.STRING,
        }
    }, { timestamps: false });
}