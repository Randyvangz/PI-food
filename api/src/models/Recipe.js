const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL,
    },
    healthylevel: {
      type: DataTypes.INTEGER,
    },
    stepbystep: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, { timestamps: false });
};
