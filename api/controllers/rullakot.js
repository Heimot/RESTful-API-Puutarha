const mongoose = require('mongoose');
const Rullakko = require('../models/rullakko');

exports.rullakko_get_all = (req, res, next) => {
    let year = req.query.year;
    Rullakko.find()
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

exports.rullakko_create_rullakot = (req, res, next) => {
    const rullakko = new Rullakko({
        rullakonNimi: req.body.rullakonNimi,
        rullakoidenMaara: req.body.rullakoidenMaara,
        kaupanNimi: req.body.kaupanNimi,
        palautetutRullakot: req.body.palautetutRullakot,
        vuosi: req.body.vuosi,
        id: req.body._id,
    });
    rullakko
        .save()
        .then(result => {
            
            res.status(201).json({
                message: 'Created product successfully',
                createdRullakko: {
                    rullakonNimi: result.rullakonNimi,
                    rullakoidenMaara: result.rullakoidenMaara,
                    kaupanNimi: result.kaupanNimi,
                    palautetutRullakot: result.palautetutRullakot,
                    vuosi: result.vuosi,
                    id: result._id,
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

exports.rullakko_get_by_id = (req, res, next) => {
    const id = req.params.rullakkoId;
    Rullakko.findById(id)
        .select('name price _id')
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

exports.rullakko_update_by_id = (req, res, next) => {
    const id = req.params.rullakkoId;
    Rullakko.updateOne({ _id: id }, req.body, { new: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Rullakko updated',
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

exports.rullakko_patch_by_id = (req, res, next) => {
    const id = req.params.rullakkoId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Rullakko.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Rullakko updated',
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

exports.rullakko_delete_by_id = (req, res, next) => {
    const id = req.params.rullakkoId;
    Rullakko.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Rullakko deleted',
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
