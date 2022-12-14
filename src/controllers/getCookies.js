module.exports = getCookies = (req) => {
    if (!req.headers.cookie) {
        return null
    }

    // read cookie string to cookie array
    const cookieObj = req.headers.cookie.split('; ')

    // create cookie object
    const cookies = {}

    cookieObj.forEach(element => {
        element = element.split('=')
        cookies[element[0]] = element[1]
    })

    return cookies
}