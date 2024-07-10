const { updateBalance } = require('../services/userService');
const { validateTransaction } = require('../validators/userValidator');

exports.updateUserBalance = async (req, res, next) => {
  try {
    const { error } = validateTransaction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { userId, amount } = req.body;
    const updatedUser = await updateBalance(userId, amount);
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};
