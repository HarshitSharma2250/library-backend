const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        age: { type: Number, required: true },
        role: { type: Array, required: true },
        userId: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const UserModel = mongoose.model("userdata", userSchema);

module.exports = UserModel;
