const mongoose = require('mongoose');
const Hylly = require('../models/hylly');

exports.hylly_get_all = (req, res, next) => {
    let year = req.query.year;
    Hylly.find()
        .exec()
        .then(docs => {
            if (year.length > 1) {
                res.status(200).json(docs.filter(doc => {
                    return doc.vuosi === parseInt(year)
                }));
            } else {
                res.status(200).json(docs)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.hylly_create_rullakot = (req, res, next) => {
    const hylly = new Hylly({
        _id: mongoose.Types.ObjectId(),
        hyllynNimi: req.body.hyllynNimi,
        hyllyjenMaara: req.body.hyllyjenMaara,
        kaupanNimi: req.body.kaupanNimi,
        vuosi: req.body.vuosi,
        history: req.body.history,
    });
    hylly
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Created product successfully',
                createdHylly: {
                    hyllynNimi: result.hyllynNimi,
                    hyllyjenMaara: result.hyllyjenMaara,
                    kaupanNimi: result.kaupanNimi,
                    vuosi: result.vuosi,
                    history: result.history,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}

exports.hylly_get_by_id = (req, res, next) => {
    const id = req.params.hyllyId;
    Hylly.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.hylly_update_by_id = (req, res, next) => {
    const id = req.params.hyllyId;
    Hylly.updateOne({ _id: id }, req.body, { new: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Hylly updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.hylly_patch_by_id = (req, res, next) => {
    const id = req.params.hyllyId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Hylly.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Hylly updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.hylly_delete_by_id = (req, res, next) => {
    const id = req.params.hyllyId;
    Hylly.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Hylly deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
