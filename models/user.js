const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    }
},
{timestamps: true}
)

const Test = mongoose.models.test || mongoose.model("test",userSchema)
module.exports = Test