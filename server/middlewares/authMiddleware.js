const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({error:"Not Authorized"});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;
        next();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = authMiddleware;