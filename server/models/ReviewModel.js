const { Schema, model} = require('mongoose');


const ReviewSchema = new Schema({
    title_game: { type: Schema.Types.String, ref: 'Game', required: true },
    text_review: { type: String, required: true },
    author: { type: Schema.Types.String, ref: 'User', required: true },
    grade: { type: Number, required: true }
});

module.exports = model('Review', ReviewSchema);
