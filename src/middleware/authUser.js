const jwt = require('jsonwebtoken');
const getCookies = require('../controllers/getCookies')

module.exports = authUser = async (req, res, next) => {
    try {

        // read cookie
        const cookies = getCookies(req)

        var token = null;

        if (!(cookies && cookies.userCookie)) token = req.headers.authorization
        else token = cookies.userCookie

        if (token == null)
            return res.status(203).json({
                status: 203,
                message: 'You are not logged in',
            })

        try {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    console.log(error)
                    return res.status(401).json({
                        status: 401,
                        message: 'Invalid Token',
                        token: token
                    })
                } else {
                    req.user = decoded;
                    next()
                }
            })
        } catch (err) {
            console.error('something wrong with auth middleware')
            return res.status(500).json({
                status: 500,
                message: 'Server Error',
            })
        }

    } catch (err) {
        console.error(`Error Message: ${err.message}`)
        return res.status(203).json({
            status: 203,
            message: 'Invalid Token',
        })
    }
}