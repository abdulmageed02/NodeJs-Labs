const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        fName: { type: String, required: true, minLenghth: 4 },
        lName: String,
        email: { type: String, unique: true},
        dob: Date
    }
)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel