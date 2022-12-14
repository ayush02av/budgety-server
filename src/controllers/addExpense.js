const userModel = require('../models/user')
const budgetMonthModel = require('../models/budgetMonth')

module.exports = addExpense = async (user, currentMonth, amount, source) => {
    const today = new Date()

    const currentMonthExpenseNew = await budgetMonthModel.updateOne(
        {
            _id: currentMonth._id
        },
        {
            $push: {
                'expense': {
                    amount: amount,
                    source: source,
                    createdAt: today,
                    updatedAt: today,
                    lastUpdate: 'create'
                }
            },
            $inc: {
                totalExpense: amount,
                totalSavings: (-amount)
            },
            $set: {
                updatedAt: today,
                lastUpdate: 'add expense'
            }
        }
    )

    if (!currentMonthExpenseNew) return false

    const updateUser = await userModel.updateOne(
        {
            _id: user._id
        },
        {
            "$inc": {
                balance: (-amount)
            },
            $set: {
                updatedAt: today,
                lastUpdate: 'update balance'
            }
        }
    )

    return updateUser ? true : false
}