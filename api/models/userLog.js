const mongoose = require('mongoose');

const userLogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    users: [{ type: String, ref: 'RFIDUsers', required: true }],
    log: { type: String, required: true }

});

module.exports = mongoose.model('userLog', userLogSchema);