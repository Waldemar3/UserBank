'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.hasMany(models.TaskHistory, {
        foreignKey: 'taskId',
        as: 'histories'
      });
    }
  }

  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      interval: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
      },
      lastRunAt: {
        type: DataTypes.DATE
      },
      serverId: {
        type: DataTypes.STRING
      },
      isRunning: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true
    }
  );

  return Task;
};
