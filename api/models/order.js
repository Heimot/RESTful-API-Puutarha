const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    kauppa: { type: String, required: true },
    alisatieto: { type: String, required: false },
    date: { type: String, required: true },
    toimituspvm: { type: String, required: true },
    valmis: { type: Number, required: true, default: 0 }, // default 0 means that it isnt ready yet and 1 means its ready and checked.

    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false}]
});

module.exports = mongoose.model('Order', orderSchema);