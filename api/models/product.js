const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    kauppa: { type: String, required: true },
    kukka: {
        kukka1: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
        },
        kukka2: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
        },
        kukka3: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
        },
        kukka4: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
        },
        kukka5: {
            name: { type: String, required: false, default: "0" },
            toimi: { type: Number, required: false, default: 0 },
            kerays: { type: String, required: false, default: "0" },
        },
    },
});

module.exports = mongoose.model('Product', productSchema);