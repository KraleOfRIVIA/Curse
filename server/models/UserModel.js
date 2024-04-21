const { Schema, model} = require('mongoose');


const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    games: { type: [Schema.Types.String], ref: 'Game', default: [] },
});

module.exports = model('User', userSchema);
