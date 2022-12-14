
module.exports = logger = async (req, res, next) => {
    try {
        console.log(req.body)
        next()

    } catch (err) {
        console.error(`Error Message: ${err.message}`)
        return res.status(203).json({
            status: 203,
            message: 'Invalid Token',
        })
    }
}