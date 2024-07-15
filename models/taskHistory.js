'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskHistory extends Model {
    static associate(models) {
      TaskHistory.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task'
      });
    }
  }

  TaskHistory.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id'
        }
      },
      serverId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      runAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      finishedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'TaskHistory',
      tableName: 'taskHistories',
      timestamps: true
    }
  );

  return TaskHistory;
};
