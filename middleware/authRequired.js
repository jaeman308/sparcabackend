const jwt  = require('jsonwebtoken');

const authRequired = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: "Authorization header missing"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Token missing"});
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token", error});
    }
};

module.exports = authRequired;      