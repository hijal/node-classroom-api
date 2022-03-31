'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.students, {
        through: 'student-course',
        foreignKey: 'courseId',
        as: 'students'
      });
      Course.belongsTo(models.lectures, {
        foreignKey: 'lectureId',
        as: 'lectures'
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
      modelName: 'courses',
      paranoid: true
    }
  );
  return Course;
};
