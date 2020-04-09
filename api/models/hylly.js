const mongoose = require('mongoose');

const hyllySchema = mongoose.Schema({
    hyllynNimi: {type: String, required: true, default: "Oma"},
    hyllyjenMaara: {type: Number, required: true, default: 0},
    kaupanNimi: {type: String, required: true},
    palautetutHyllyt: {type: Number, required: true, default: 0},
});

module.exports = mongoose.model('Hyllyt', hyllySchema);