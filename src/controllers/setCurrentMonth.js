const budgetMonthModel = require('../models/budgetMonth')

module.exports = setCurrentMonth = async (user) => {
    const today = new Date()

    const currentMonth = new budgetMonthModel({
        user: user._id,
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        savingsGoal: user.monthlySavingsGoal,
        createdAt: today,
        updatedAt: today,
        lastUpdate: 'create'
    })
    await currentMonth.save()

    return {
        _id: currentMonth._id,
        month: currentMonth.month,
        year: currentMonth.year,
        totalIncome: currentMonth.totalIncome,
        totalExpense: currentMonth.totalExpense,
        savingsGoal: currentMonth.savingsGoal,
        totalSavings: currentMonth.totalSavings,
        fixedIncomeDone: currentMonth.fixedIncomeDone,
        fixedExpenseDone: currentMonth.fixedExpenseDone
    }
}