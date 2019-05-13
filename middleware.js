// middleware.js
module.exports = (req, res, next) => {
    const token = req.headers.hasOwnProperty("token") ? req.headers.token : null;
    if (!token || token === null) {
        return res.status(403).send();
    }
    res.header('X-Hello', 'World')
    next()
  }