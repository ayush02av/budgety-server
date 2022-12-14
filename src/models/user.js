const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
    },
    balance: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    fixedIncomePerMonth: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    fixedExpensePerMonth: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    fixedIncomePayDayOfMonth: {
        type: mongoose.Schema.Types.Number,
        default: 10
    },
    fixedExpensePayDayOfMonth: {
        type: mongoose.Schema.Types.Number,
        default: 15
    },
    monthlySavingsGoal: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    },
    lastUpdate: {
        type: mongoose.Schema.Types.String,
        default: null
    }
})

const model = mongoose.model('user', schema)

module.exports = model