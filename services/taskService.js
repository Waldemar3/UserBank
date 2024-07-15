const { Task, TaskHistory } = require('../models');

exports.getAllTasks = async () => {
  const tasks = await Task.findAll({
    include: [{
      model: TaskHistory,
      as: 'histories'
    }]
  });
  return tasks;
};
