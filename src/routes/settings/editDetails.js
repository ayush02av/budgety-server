const userModel = require('../../models/user')
const budgetMonthModel = require('../../models/budgetMonth')
const getCurrentMonth = require('../../controllers/getCurrentMonth')

module.exports = editDetails = async (req, res) => {
    try {
        const {
            fixedIncomePerMonth,
            fixedExpensePerMonth,
            fixedIncomePayDayOfMonth,
            fixedExpensePayDayOfMonth,
            monthlySavingsGoal
        } = req.body

        const user = await userModel.findById(req.user.user.id)

        // check user input
        if (!fixedIncomePerMonth || !fixedExpensePerMonth || !fixedIncomePayDayOfMonth || !fixedExpensePayDayOfMonth || !monthlySavingsGoal) {
            return res.status(203).json({
                status: 203,
                message: 'Bad Request. Required fields not provided.'
            })
        }

        // updation
        const today = new Date()

        const userUpdate = await userModel.updateOne(
            {
                _id: user._id
            },
            {
                $set: {
                    fixedIncomePerMonth: fixedIncomePerMonth,
                    fixedExpensePerMonth: fixedExpensePerMonth,
                    fixedIncomePayDayOfMonth: fixedIncomePayDayOfMonth,
                    fixedExpensePayDayOfMonth: fixedExpensePayDayOfMonth,
                    monthlySavingsGoal: monthlySavingsGoal,
                    updatedAt: today,
                    lastUpdate: 'update details'
                }
            }
        )
        if (!userUpdate) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }

        const currentMonth = await getCurrentMonth(user)
        const budgetMonthUpdate = await budgetMonthModel.updateOne(
            {
                _id: currentMonth._id
            },
            {
                $set: {
                    savingsGoal: monthlySavingsGoal,
                    updatedAt: today,
                    lastUpdate: 'update details'
                }
            }
        )
        if (!budgetMonthUpdate) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Details Updated'
        })

    } catch (err) {
        console.error(`Error Message: ${err.message}`)
        return res.status(500).json({
            status: 500,
            message: 'Server error'
        })
    }
}