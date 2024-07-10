const { sequelize } = require('../models');

exports.updateBalance = async (userId, amount) => {
  try {
    const [ updated ] = await sequelize.query(
      'UPDATE users SET balance = balance + :amount WHERE id = :userId AND balance + :amount >= 0 RETURNING *',
      {
        replacements: { userId, amount },
        type: sequelize.QueryTypes.UPDATE
      }
    );

    if (updated.length === 0) {
      throw new Error('Пользователь не найден или недостаточно средств');
    }

    return updated[0];
  } catch (err) {
    throw err;
  }
};
