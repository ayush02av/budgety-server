const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../../models/user')

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        // check user input
        if (!email || !password) {
            return res.status(203).json({
                status: 203,
                message: 'Bad Request. Required fields not provided.'
            })
        }

        // validations
        const userCheck = await userModel.findOne({
            email
        })
        if (!userCheck) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid Email'
            })
        }

        // processing
        const isMatch = await bcrypt.compare(password, userCheck.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: 'Password incorrect'
            })
        }

        const payload = {
            user: {
                id: userCheck._id,
            }
        }

        jwt.sign(
            payload, process.env.JWT_SECRET, { expiresIn: '7 days' },
            (err, token) => {
                if (err) throw err

                //set cookie
                res.cookie('userCookie', token, {
                    httpOnly: false
                })

                return res.status(200).json({
                    status: 200,
                    message: 'User Logged In',
                    token: token
                })
            }
        )
    } catch (err) {
        console.error(`Error Message: ${err.message}`)
        return res.status(500).json({
            status: 500,
            message: 'Server error'
        })
    }
}

module.exports = login