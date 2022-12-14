const budgetMonthModel = require('../models/budgetMonth')
const setCurrentMonth = require('./setCurrentMonth')

module.exports = getCurrentMonth = async (user) => {
    const today = new Date()

    var currentMonth = await budgetMonthModel.findOne({
        user: user._id,
        month: today.getMonth() + 1,
        year: today.getFullYear()
    }, {
        month: 1,
        year: 1,
        totalIncome: 1,
        totalExpense: 1,
        savingsGoal: 1,
        totalSavings: 1,
        fixedIncomeDone: 1,
        fixedExpenseDone: 1
    })

    if (!currentMonth) currentMonth = await setCurrentMonth(user)

    return currentMonth
}