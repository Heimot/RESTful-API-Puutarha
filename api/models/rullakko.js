const mongoose = require('mongoose');

const rullakkoSchema = mongoose.Schema({
    rullakonNimi: {type: String, required: true, default: "Oma"},
    rullakoidenMaara: {type: Number, required: true, default: 0},
    kaupanNimi: {type: String, required: true},
    palautetutRullakot: {type: Number, required: true, default: 0},
    vuosi: {type: Number, required: true}
});

module.exports = mongoose.model('Rullakot', rullakkoSchema);