const budgetMonthModel = require('../models/budgetMonth')
const userModel = require('../models/user')

module.exports = addIncome = async (user, currentMonth, amount, source) => {
    const today = new Date()

    const currentMonthIncomeNew = await budgetMonthModel.updateOne(
        {
            _id: currentMonth._id
        },
        {
            $push: {
                'income': {
                    amount: amount,
                    source: source,
                    createdAt: today,
                    updatedAt: today,
                    lastUpdate: 'create'
                }
            },
            $inc: {
                totalIncome: amount,
                totalSavings: amount
            },
            $set: {
                updatedAt: today,
                lastUpdate: 'add income'
            }
        }
    )

    if (!currentMonthIncomeNew) return false

    const updateUser = await userModel.updateOne(
        {
            _id: user._id
        },
        {
            "$inc": {
                balance: amount
            },
            $set: {
                updatedAt: today,
                lastUpdate: 'update balance'
            }
        }
    )

    return updateUser ? true : false
}