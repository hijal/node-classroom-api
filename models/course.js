'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.student, {
        through: 'student-course',
        foreignKey: 'courseId',
        as: 'students'
      });
      Course.belongsTo(models.lecture, {
        foreignKey: 'lectureId',
        as: 'lecture'
      });
    }
  }
  Course.init(
    {
      lectureId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'course',
      paranoid: true
    }
  );
  return Course;
};
