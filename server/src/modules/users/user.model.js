const {  Schema, model} = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: [6, "Your password is too weak"],
    },
    likedPost: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },

},
{
    timestamps: true,
}
);
module.exports = ("User", userSchema)