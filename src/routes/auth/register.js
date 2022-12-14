const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../../models/user')

module.exports = register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        await userModel.deleteMany()

        // check user input
        if (!name || !email || !password) {
            return res.status(203).json({
                status: 203,
                message: 'Bad Request. Required fields not provided.'
            })
        }

        if (!email.includes('@')) {
            return res.status(203).json({
                status: 203,
                message: 'Bad Request. Email not valid'
            })
        }

        // validations
        const emailCheck = await userModel.findOne({
            email,
        })
        if (emailCheck) {
            return res.status(400).json({
                status: 400,
                message: 'Email exists'
            })
        }

        // creation
        const salt = await bcrypt.genSalt(10)
        const today = new Date()

        const userNew = new userModel({
            name: name,
            email: email,
            password: await bcrypt.hash(password, salt),
            createdAt: today,
            updatedAt: today,
            lastUpdate: 'create'
        })
        await userNew.save()

        const payload = {
            user: {
                id: userNew._id,
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
                    message: 'User Registered'
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