'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    static associate(models) {}
  }
  StudentCourse.init(
    {
      studentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'students',
          key: 'id'
        }
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'courses',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'student-course',
      paranoid: true
    }
  );
  return StudentCourse;
};
