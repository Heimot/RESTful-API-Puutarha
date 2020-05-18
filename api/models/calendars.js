const mongoose = require('mongoose');

const calendarSchema = mongoose.Schema({
    _id: { type: String, required: true },
    info: { type: String, required: false },
    keraysInfo: { type: String, required: false },
});

module.exports = mongoose.model('Calendar', calendarSchema);