const userModel = require('../../models/user')
const getCurrentMonth = require('../../controllers/getCurrentMonth')
const addExpenseController = require('../../controllers/addExpense')

module.exports = addExpense = async (req, res) => {
    try {
        const {
            amount,
            source
        } = req.body

        const user = await userModel.findById(req.user.user.id)

        if (amount == 0) {
            return res.status(203).json({
                status: 203,
                message: 'Amount can\'t be 0'
            })
        }

        if (amount > user.balance) {
            return res.status(203).json({
                status: 203,
                message: 'Amount more than your balance'
            })
        }

        const currentMonth = await getCurrentMonth(user)

        // check user input
        if (!amount || !source) {
            return res.status(203).json({
                status: 203,
                message: 'Bad Request. Required fields not provided.'
            })
        }

        // addition
        if (!addExpenseController(user, currentMonth, amount, source)) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Expense Added'
        })

    } catch (err) {
        console.error(`Error Message: ${err.message}`)
        return res.status(500).json({
            status: 500,
            message: 'Server error'
        })
    }
}