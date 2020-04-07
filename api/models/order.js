const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    kauppa: { type: String, required: true },
    alisatieto: { type: String, required: false },
    date: { type: String, required: true },
    toimituspvm: { type: String, required: true },
    tuusjarvi: { type: String, required: true, default: "Ei"},
    ryona: { type: String, required: true, default: "Ei"},

    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false}],
    
    rullakot: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rullakot', required: false}]
});

module.exports = mongoose.model('Order', orderSchema);