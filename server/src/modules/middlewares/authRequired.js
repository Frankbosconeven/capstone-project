const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors")
exports.authRequired  = async (req, res, next) => {
    const auth = req.hearders.authorization;

    if (!auth) {
        next(createHttpError(403,"please log in to access"))
    };
    
    const token = auth.split("Bearer")[1];
    if (!auth) {
    next(createHttpError(403,"please log in to access"));
    }
    
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
    next(createHttpError(403,"please log in to access"))
    }

    req.user = user
    next();
};