const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userController = require('./controllers/userController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.put('/user/balance', userController.updateUserBalance);

app.use((req, res, next) => {
    const error = new Error(`Not found page - ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await sequelize.sync();
});
