const { Schema, model} = require('mongoose');


const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    games: { type: [Schema.Types.String], ref: 'Game', default: [] },
});

module.exports = model('User', userSchema);
