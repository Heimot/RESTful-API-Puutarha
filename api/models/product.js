const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    published: { type: Boolean, required: true, default: true },
    kauppa: { type: String, required: true },
    alisatieto: { type: String, required: false },
    date: { type: String, required: true },
    toimituspvm: { type: String, required: true },
    valmis: { type: Number, required: true, default: 0 }, // default 0 means that it isnt ready yet and 1 means its ready and checked.
    kukka: {
        kukka1: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
            keratty: { type: String, required: false, default: "Odottaa keräystä" },
            kerattymaara: { type: Number, required: false, default: 0 },
            lisatieto: { type: String, required: false, default: "" },
        },
        kukka2: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
            keratty: { type: String, required: false, default: "Odottaa keräystä" },
            kerattymaara: { type: Number, required: false, default: 0 },
            lisatieto: { type: String, required: false, default: "" },
        },
        kukka3: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
            keratty: { type: String, required: false, default: "Odottaa keräystä" },
            kerattymaara: { type: Number, required: false, default: 0 },
            lisatieto: { type: String, required: false, default: "" },
        },
        kukka4: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
            keratty: { type: String, required: false, default: "Odottaa keräystä" },
            kerattymaara: { type: Number, required: false, default: 0 },
            lisatieto: { type: String, required: false, default: "" },
        },
        kukka5: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
            keratty: { type: String, required: false, default: "Odottaa keräystä" },
            kerattymaara: { type: Number, required: false, default: 0 },
            lisatieto: { type: String, required: false, default: "" },
        },
    },
});

module.exports = mongoose.model('Product', productSchema);