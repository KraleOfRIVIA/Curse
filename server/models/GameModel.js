const { Schema, model} = require('mongoose');


const gameSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true }
});

module.exports = model('Game', gameSchema);
