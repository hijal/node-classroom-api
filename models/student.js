'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.classrooms, {
        foreignKey: 'classroomId',
        as: 'classroom'
      });

      Student.belongsToMany(models.courses, {
        through: 'student-course',
        as: 'courses',
        foreignKey: 'studentId'
      });
    }
  }
  Student.init(
    {
      classroomId: {
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
      modelName: 'students',
      paranoid: true
    }
  );
  return Student;
};
