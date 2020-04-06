const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: { type: String, required: true },
    flowers: [{ type: String, required: false }],
    kaupat: [{ type: String, required: false }],
});

module.exports = mongoose.model('Item', itemSchema);