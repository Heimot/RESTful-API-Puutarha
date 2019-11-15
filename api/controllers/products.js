const mongoose = require('mongoose');
const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find()
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

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        kauppa: req.body.kauppa,
        kukka: {
            kukka1: {
                name: req.body.kukka.kukka1.name,
                toimi: req.body.kukka.kukka1.toimi,
                kerays: req.body.kukka.kukka1.kerays
            },
            kukka2: {
                name: req.body.kukka.kukka2.name,
                toimi: req.body.kukka.kukka2.toimi,
                kerays: req.body.kukka.kukka2.kerays
            },
            kukka3: {
                name: req.body.kukka.kukka3.name,
                toimi: req.body.kukka.kukka3.toimi,
                kerays: req.body.kukka.kukka3.kerays
            },
            kukka4: {
                name: req.body.kukka.kukka4.name,
                toimi: req.body.kukka.kukka4.toimi,
                kerays: req.body.kukka.kukka4.kerays
            },
            kukka5: {
                name: req.body.kukka.kukka5.name,
                toimi: req.body.kukka.kukka5.toimi,
                kerays: req.body.kukka.kukka5.kerays
            },
        },
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    kauppa: result.kauppa,
                    kukka: {
                        kukka1: {
                            name: result.kukka.kukka1.name,
                            toimi: result.kukka.kukka1.toimi,
                            kerays: result.kukka.kukka1.kerays,
                        },
                        kukka2: {
                            name: result.kukka.kukka2.name,
                            toimi: result.kukka.kukka2.toimi,
                            kerays: result.kukka.kukka2.kerays,
                        },
                        kukka3: {
                            name: result.kukka.kukka3.name,
                            toimi: result.kukka.kukka3.toimi,
                            kerays: result.kukka.kukka3.kerays,
                        },
                        kukka4: {
                            name: result.kukka.kukka4.name,
                            toimi: result.kukka.kukka4.toimi,
                            kerays: result.kukka.kukka4.kerays,
                        },
                        kukka5: {
                            name: result.kukka.kukka5.name,
                            toimi: result.kukka.kukka5.toimi,
                            kerays: result.kukka.kukka5.kerays,
                        },
                    },
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

exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
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

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated',
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

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
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