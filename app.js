const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.put('/user/balance', userController.updateUserBalance);

app.get('/tasks', taskController.getTasks);

app.use((req, res, next) => {
    const error = new Error(`Not found page - ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

app.use(errorHandler);

require('./cron/taskCron');

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await sequelize.sync();
});
