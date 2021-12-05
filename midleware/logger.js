function logger(req ,res , next) {
    console.log(`[Logger] : from ${req.hostname}${req.path}`)
    next()
}
module.exports = logger