const mongoose = require('mongoose');

const rullakkoSchema = mongoose.Schema({
    rullakonNimi: {type: String, required: true, default: "Rullakko"},
    rullakoidenMaara: {type: Number, required: true, default: 0},
    hyllyjenMaara: {type: Number, required: true, default: 0},
});

module.exports = mongoose.model('Rullakot', rullakkoSchema);