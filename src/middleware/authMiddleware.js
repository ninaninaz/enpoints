const authMiddleware = (req, res, next) => {
    console.log("test")
    next()
}

module.exports = authMiddleware
