const userModel = require('../../models/user')
const getCurrentMonth = require('../../controllers/getCurrentMonth')
const addIncomeController = require('../../controllers/addIncome')

module.exports = addIncome = async (req, res) => {
    try {
        const {
            amount,
            source
        } = req.body

        const user = await userModel.findById(req.user.user.id)
        const currentMonth = await getCurrentMonth(user)

        // check user input
        if (!amount || !source) {
            return res.status(203).json({
                status: 203,
                message: 'Bad Request. Required fields not provided.'
            })
        }

        // addition
        if (!addIncomeController(user, currentMonth, amount, source)) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Income Added'
        })

    } catch (err) {
        console.error(`Error Message: ${err.message}`)
        return res.status(500).json({
            status: 500,
            message: 'Server error'
        })
    }
}