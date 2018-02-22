'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipes = sequelize.define('recipes', {
    name: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    directions: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return recipes;
};