'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    static associate(models) {
      Lecture.hasOne(models.course, {
        foreignKey: 'courseId',
        as: 'course'
      });
    }
  }
  Lecture.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'lecture',
      paranoid: true
    }
  );
  return Lecture;
};
