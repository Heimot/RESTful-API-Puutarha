const mongoose = require('mongoose');

const palautetutSchema = mongoose.Schema({
    _id: { type: String, required: true },
    rullakonNimi: { type: String },
    rullakoidenMaara: { type: Number, default: 0 },
    hyllynNimi: { type: String },
    hyllyjenMaara: { type: Number, default: 0 },
    kaupanNimi: { type: String, required: true },
    vuosi: { type: Number, required: true },
    history: { type: String, required: true },
    oldData: { type: String, required: true },
    history2: { type: String, required: true },
    oldData2: { type: String, required: true },
});

module.exports = mongoose.model('Palautetut', palautetutSchema);