const mongoose = require('mongoose');

const hyllySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hyllynNimi: {type: String, required: true, default: "Oma"},
    hyllyjenMaara: {type: Number, required: true, default: 0},
    kaupanNimi: {type: String, required: true},
});

module.exports = mongoose.model('Hyllyt', hyllySchema);