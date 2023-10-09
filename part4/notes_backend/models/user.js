const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
//Note: username Regex from:
//https://stackoverflow.com/a/6814901
//https://stackoverflow.com/a/8462639

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength:4,
        maxLength: 16,
        trim: true,
        match: /^[a-zA-Z][a-zA-Z0-9]+$/
    },
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 16
    },
    passwordHash: {
        type: String,
        required: true
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
})

userSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        // the passwordHash should not be revealed
        delete returnedObj.passwordHash
    }
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)
module.exports = User