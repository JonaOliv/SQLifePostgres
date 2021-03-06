'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Schedule, {
        through: 'Schedule',
        as: 'courses',
        foreignKey: 'student_id'
      });
    }
  };
  Student.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students'
  });
  return Student;
};