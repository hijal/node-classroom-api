'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.classroom, {
        foreignKey: 'classroomId',
        as: 'classroom'
      });

      Student.belongsToMany(models.course, {
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
      modelName: 'student',
      paranoid: true
    }
  );
  return Student;
};
