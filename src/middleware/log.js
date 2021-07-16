module.exports = (req, res, next) =>{
    console.error(req.url)
    // console.error(req.method)
    // console.error(req.headers['content-type'])
    next()
}