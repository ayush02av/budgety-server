const express = require('express')
const router = express.Router()

// get middlewares
const authUser = require('./middleware/authUser')

// user routes
// auth
router.post('/auth/register', require('./routes/auth/register'))
router.post('/auth/login', require('./routes/auth/login'))

// general
router.get('/general/profile', authUser, require('./routes/general/profile'))

// transactions
router.post('/transactions/addIncome', authUser, require('./routes/transactions/addIncome'))
router.post('/transactions/addExpense', authUser, require('./routes/transactions/addExpense'))

// settings
router.put('/settings/editDetails', authUser, require('./routes/settings/editDetails'))

module.exports = router