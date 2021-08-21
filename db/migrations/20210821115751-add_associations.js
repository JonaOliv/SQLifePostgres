'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    console.log('courses_to_categories_foreign_idx' + ' CREATING');
    await queryInterface.addConstraint(
      'courses',
      {
        fields: ['category_id'],
        type: 'foreign key',
        name: 'courses_to_categories_foreign_idx',
        references: {
          table: 'categories',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ).catch((error) => { console.log(error); }).then(results => {
      console.log('schedules_to_courses_foreign_idx' + ' CREATING');
      return queryInterface.addConstraint(
          'schedules',
          {
            fields: ['course_id'],
            type: 'foreign key',
            name: 'schedules_to_courses_foreign_idx',
            references: {
              table: 'courses',
              field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
          }
      );
    }).catch((error) => { console.log(error); }).then(results => {
      console.log('schedules_to_students_foreign_idx' + ' CREATING');
      return queryInterface.addConstraint(
          'schedules',
          {
            fields: ['student_id'],
            type: 'foreign key',
            name: 'schedules_to_students_foreign_idx',
            references: {
              table: 'students',
              field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
          }
      );
    }).catch((error) => { console.log(error); });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     console.log('schedules_to_students_foreign_idx'+' REMOVING');
     await queryInterface.removeConstraint(
      'schedules', 'schedules_to_students_foreign_idx'
    ).then((results) => {
      console.log('schedules_to_courses_foreign_idx'+' REMOVING');
      return queryInterface.removeConstraint(
        'schedules', 'schedules_to_courses_foreign_idx'
      );
    }).then((results) => {
      console.log('courses_to_categories_foreign_idx'+' REMOVING');
      return queryInterface.removeConstraint(
        'courses', 'courses_to_categories_foreign_idx'
      );
    }).catch((error) => {
      console.log(error);
    });
  }
};
