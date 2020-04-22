const mongoose = require('mongoose');
const Palautetut = require('../models/palautetut');

exports.palautetut_get_all = (req, res, next) => {
    let year = req.query.year;
    Palautetut.find()
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

exports.palautetut_create_rullakot = (req, res, next) => {
    const palautetut = new Palautetut({
        _id: req.body._id,
        rullakonNimi: req.body.rullakonNimi,
        rullakoidenMaara: req.body.rullakoidenMaara,
        hyllynNimi: req.body.hyllynNimi,
        hyllyjenMaara: req.body.hyllyjenMaara,
        kaupanNimi: req.body.kaupanNimi,
        vuosi: req.body.vuosi,
        history: req.body.history,
        oldData: req.body.oldData,
        history2: req.body.history2,
        oldData2: req.body.oldData2,
    });
    palautetut
        .save()
        .then(result => {

            res.status(201).json({
                message: 'Created product successfully',
                createdPalautetut: {
                    rullakonNimi: result.rullakonNimi,
                    rullakoidenMaara: result.rullakoidenMaara,
                    hyllynNimi: result.hyllynNimi,
                    hyllyjenMaara: result.hyllyjenMaara,
                    kaupanNimi: result.kaupanNimi,
                    vuosi: result.vuosi,
                    history: result.history,
                    oldData: result.oldData,
                    history2: result.history2,
                    oldData2: result.oldData2,
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

exports.palautetut_get_by_id = (req, res, next) => {
    const id = req.params.palautetutId;
    Palautetut.findById(id)
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

exports.palautetut_update_by_id = (req, res, next) => {
    const id = req.params.palautetutId;
    Palautetut.updateOne({ _id: id }, req.body, { new: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Palautetut updated',
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

exports.palautetut_patch_by_id = (req, res, next) => {
    const id = req.params.palautetutId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Palautetut.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Palautetut updated',
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

exports.palautetut_delete_by_id = (req, res, next) => {
    const id = req.params.palautetutId;
    Palautetut.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Palautetut deleted',
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
