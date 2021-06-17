const Logs = require('../models/userLog.js');

exports.products_get_all = (req, res, next) => {
    Logs.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}