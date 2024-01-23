const Expense = require('../models/expenses');
const Income = require('../models/incomes');
const User = require('../models/user');
const sequelize = require('sequelize');

exports.showLeaderboard = async(req,res) =>{
   
    try {
        const leaderboardData = await User.findAll({
            attributes: [
              'id',
              'name',
              [sequelize.fn('sum', sequelize.col('amountExp')), 'total_expense'],
            ],
            include: [
              {
                model: Expense,
                attributes: []
              },
            ],
            group: ['user.id'],
            order:[['total_expense','DESC']]
          });

        res.status(200).json(leaderboardData);

      } catch (err) {
        console.error(err);
      }
}