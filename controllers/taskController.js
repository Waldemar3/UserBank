const taskService = require('../services/taskService');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};