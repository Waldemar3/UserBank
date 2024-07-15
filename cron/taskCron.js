const cron = require('node-cron');
const { Task, TaskHistory, sequelize } = require('../models');
const { Op } = require('sequelize');
const sleep = require('../utils/sleep');
const logger = require('../utils/logger');

const serverId = process.env.SERVER_ID || 'default-server';

const tasks = [
  { name: 'Task 1', interval: '*/2 * * * *' },
  { name: 'Task 2', interval: '*/2 * * * *' },
  { name: 'Task 3', interval: '*/2 * * * *' },
  { name: 'Task 4', interval: '*/2 * * * *' },
  { name: 'Task 5', interval: '*/2 * * * *' },
  { name: 'Task 6', interval: '*/2 * * * *' },
  { name: 'Task 7', interval: '*/2 * * * *' },
  { name: 'Task 8', interval: '*/2 * * * *' },
  { name: 'Task 9', interval: '*/2 * * * *' },
  { name: 'Task 10', interval: '*/2 * * * *' }
];

const runTask = async (task) => {
  logger.info(`Running task: ${task.name} on server: ${serverId}`);

  await TaskHistory.create({
    taskId: task.id,
    serverId: serverId,
    runAt: new Date()
  });

  await sleep(2 * 60 * 1000);

  await TaskHistory.update(
    { finishedAt: new Date() },
    {
      where: {
        taskId: task.id,
        serverId: serverId,
        runAt: { [Op.ne]: null },
        finishedAt: null
      }
    }
  );

  logger.info(`Task: ${task.name} Server: ${serverId}`);
};

const scheduleTasks = async () => {
  for (const task of tasks) {
    const [scheduledTask, created] = await Task.findOrCreate({
      where: { name: task.name },
      defaults: { interval: task.interval }
    });

    if (!created) {
      await scheduledTask.update({ interval: task.interval });
    }

    const job = async () => {
      const isRunning = await TaskHistory.findOne({
        where: {
          taskId: scheduledTask.id,
          finishedAt: null
        }
      });

      if (!isRunning) {
        await sequelize.transaction(async (t) => {
          const [updated] = await Task.update(
            { isRunning: true, lastRunAt: new Date(), serverId: serverId },
            {
              where: {
                id: scheduledTask.id,
                isRunning: false
              },
              transaction: t
            }
          );

          if (updated) {
            try {
              await runTask(scheduledTask);
            } finally {
              await Task.update(
                { isRunning: false },
                {
                  where: { id: scheduledTask.id },
                  transaction: t
                }
              );
            }
          }
        });
      }
    };

    cron.schedule(task.interval, job);
  }
};

scheduleTasks();
