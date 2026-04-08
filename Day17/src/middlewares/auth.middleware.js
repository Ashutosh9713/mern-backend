const jwt = require("jsonwebtoken");
    
function identifyUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
       return   res.status(401).json({
            message: "Token not provided , UnAuthorized access"
        })
    }
     
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    } catch (err) {
        return res.status(401).json({
            message: "  Unouthorized user "
        })
    }
    
    req.user = decoded ;
    
    next();

}

module.exports = identifyUser ;