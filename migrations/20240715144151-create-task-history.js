'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taskHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id'
        }
      },
      serverId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      runAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      finishedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('taskHistories');
  }
};
