const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    deliveryId: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, required: true, default: false },
    dateUsed: { type: Date, required: false, default: null }
});

module.exports = mongoose.model('delivery', deliverySchema);