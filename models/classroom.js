'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {
      Classroom.hasMany(models.students, {
        foreignKey: 'classroomId',
        as: 'students'
      });
    }
  }
  Classroom.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'classrooms',
      paranoid: true
    }
  );
  return Classroom;
};
