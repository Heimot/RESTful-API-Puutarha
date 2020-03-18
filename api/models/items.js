const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    flowers: [{ type: String, required: true }],
});

module.exports = mongoose.model('Item', itemSchema);