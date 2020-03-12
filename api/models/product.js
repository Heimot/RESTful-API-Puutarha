const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    kukka: { type: String, required: true, default: "vakio"},
    toimi: { type: Number, required: false, default: 0 },
    kerays: { type: String, required: false, default: "Ryönä" },
    keratty: { type: String, required: false, default: "Odottaa keräystä" },
    kerattymaara: { type: Number, required: false, default: 0 },
    lisatieto: { type: String, required: false, default: "" },
});

module.exports = mongoose.model('Product', productSchema);