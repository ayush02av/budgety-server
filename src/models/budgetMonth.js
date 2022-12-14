const mongoose = require('mongoose')

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    month: {
        type: mongoose.Schema.Types.Number,
    },
    year: {
        type: mongoose.Schema.Types.Number,
    },
    totalIncome: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    totalExpense: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    savingsGoal: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    totalSavings: {
        type: mongoose.Schema.Types.Number,
        default: 0.0
    },
    fixedIncomeDone: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    fixedExpenseDone: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    income: [{
        amount: {
            type: mongoose.Schema.Types.Number
        },
        source: {
            type: mongoose.Schema.Types.String,
            default: 'untracked'
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
    }],
    expense: [{
        amount: {
            type: mongoose.Schema.Types.Number,
        },
        source: {
            title: {
                type: mongoose.Schema.Types.String,
                default: 'untracked',
            },
            color: {
                type: mongoose.Schema.Types.String,
                default: '#f6f6f6'
            }
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
    }],
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

const model = mongoose.model('budgetMonth', schema)

module.exports = model