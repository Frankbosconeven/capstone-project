const User = require("./user.model");
const createhttpError = require("http-errors")
const {generateToken} = require("../utils/genrateToken")
exports.register = async (req, res, next) => {
    try {
        const{ firstName, lastName, email, password} = req.body;

        const emailExists = await User.findOne({email});
        if (emailExists) {
            next(createhttpError(404, "email already exist"));

        const hashedPassword = await bycrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        const token = generateToken(user);
        res.status(200).json({token})
        }
    } catch (error) {
        next(createhttpError(500, error.message));
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
        next(createhttpError(404, "Invalid credentials"));

        const isMatch = await bycrypt.compare(password, User.password);
    if (!isMatch) {
        next(createhttpError(400, "Invalid credentials"));
    }
        }
        const token = generateToken(user);
    res.status(20).json({token})
    } catch (error) {
        next(createhttpError(500, error.message));
    }
}