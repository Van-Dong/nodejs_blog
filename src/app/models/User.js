const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, maxLength: 256, require: true },
        email: { type: String, maxLength: 256, require: true},
        password: {type: String, maxLength: 256, required: true}
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
