const userModel = require('../../models/user')
const getCurrentMonth = require('../../controllers/getCurrentMonth')

const profile = async (req, res) => {
    try {

        const user = await userModel.findById(req.user.user.id, {
            name: 1,
            email: 1,
            balance: 1,
            fixedIncomePerMonth: 1,
            fixedExpensePerMonth: 1,
            fixedIncomePayDayOfMonth: 1,
            fixedExpensePayDayOfMonth: 1,
            monthlySavingsGoal: 1
        })

        return res.status(200).json({
            status: 200,
            message: 'Profile Fetched',
            user: user,
            currentMonth: await getCurrentMonth(user)
        })
    } catch (err) {
        console.error(`Error Message: ${err.message}`)
        return res.status(500).json({
            status: 500,
            message: 'Server error'
        })
    }
}

module.exports = profile