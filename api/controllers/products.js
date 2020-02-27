const mongoose = require('mongoose');
const Product = require('../models/product');

const users = [
    { id: 1, name: 'user 1', loggedin: true},
    { id: 2, name: 'user 2', loggedin: true},
    { id: 2, name: 'user 22', loggedin: true},
    { id: 3, name: 'user 1', loggedin: true},
    { id: 4, name: 'user 1' ,loggedin: true},
    { id: 5, name: 'user 1', loggedin: false},
]

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

exports.products_get_date = (req, res, next) => {
    const date = req.query.date;
    Product.find()
    .exec()
    .then(docs => {
        const result = docs.filter(function(docs) {
            return docs.date === date;
           });
           res.status(200).json(result);
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
        alisatieto: req.body.alisatieto,
        date: req.body.date,
        toimituspvm: req.body.toimituspvm,
        valmis: req.body.valmis,
        kukka: {
            kukka1: {
                name: req.body.kukka.kukka1.name,
                toimi: req.body.kukka.kukka1.toimi,
                kerays: req.body.kukka.kukka1.kerays,
                keratty: req.body.kukka.kukka1.keratty,
                kerattymaara: req.body.kukka.kukka1.kerattymaara,
                lisatieto: req.body.kukka.kukka1.lisatieto
            },
            kukka2: {
                name: req.body.kukka.kukka2.name,
                toimi: req.body.kukka.kukka2.toimi,
                kerays: req.body.kukka.kukka2.kerays,
                keratty: req.body.kukka.kukka2.keratty,
                kerattymaara: req.body.kukka.kukka2.kerattymaara,
                lisatieto: req.body.kukka.kukka2.lisatieto
            },
            kukka3: {
                name: req.body.kukka.kukka3.name,
                toimi: req.body.kukka.kukka3.toimi,
                kerays: req.body.kukka.kukka3.kerays,
                keratty: req.body.kukka.kukka3.keratty,
                kerattymaara: req.body.kukka.kukka3.kerattymaara,
                lisatieto: req.body.kukka.kukka3.lisatieto
            },
            kukka4: {
                name: req.body.kukka.kukka4.name,
                toimi: req.body.kukka.kukka4.toimi,
                kerays: req.body.kukka.kukka4.kerays,
                keratty: req.body.kukka.kukka4.keratty,
                kerattymaara: req.body.kukka.kukka4.kerattymaara,
                lisatieto: req.body.kukka.kukka4.lisatieto
            },
            kukka5: {
                name: req.body.kukka.kukka5.name,
                toimi: req.body.kukka.kukka5.toimi,
                kerays: req.body.kukka.kukka5.kerays,
                keratty: req.body.kukka.kukka5.keratty,
                kerattymaara: req.body.kukka.kukka5.kerattymaara,
                lisatieto: req.body.kukka.kukka5.lisatieto
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
                    alisatieto: result.alisatieto,
                    date: result.date,
                    toimituspvm : result.toimituspvm,
                    valmis: result.valmis,
                    kukka: {
                        kukka1: {
                            name: result.kukka.kukka1.name,
                            toimi: result.kukka.kukka1.toimi,
                            kerays: result.kukka.kukka1.kerays,
                            keratty: result.kukka.kukka1.keratty,
                            kerattymaara: result.kukka.kukka1.kerattymaara,
                            lisatieto: result.kukka.kukka1.lisatieto
                        },
                        kukka2: {
                            name: result.kukka.kukka2.name,
                            toimi: result.kukka.kukka2.toimi,
                            kerays: result.kukka.kukka2.kerays,
                            keratty: result.kukka.kukka2.keratty,
                            kerattymaara: result.kukka.kukka2.kerattymaara,
                            lisatieto: result.kukka.kukka2.lisatieto
                        },
                        kukka3: {
                            name: result.kukka.kukka3.name,
                            toimi: result.kukka.kukka3.toimi,
                            kerays: result.kukka.kukka3.kerays,
                            keratty: result.kukka.kukka3.keratty,
                            kerattymaara: result.kukka.kukka3.kerattymaara,
                            lisatieto: result.kukka.kukka3.lisatieto
                        },
                        kukka4: {
                            name: result.kukka.kukka4.name,
                            toimi: result.kukka.kukka4.toimi,
                            kerays: result.kukka.kukka4.kerays,
                            keratty: result.kukka.kukka4.keratty,
                            kerattymaara: result.kukka.kukka4.kerattymaara,
                            lisatieto: result.kukka.kukka4.lisatieto
                        },
                        kukka5: {
                            name: result.kukka.kukka5.name,
                            toimi: result.kukka.kukka5.toimi,
                            kerays: result.kukka.kukka5.kerays,
                            keratty: result.kukka.kukka5.keratty,
                            kerattymaara: result.kukka.kukka5.kerattymaara,
                            lisatieto: result.kukka.kukka5.lisatieto
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
    Product.updateOne({ _id: id }, req.body, { new: true })
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

exports.products_update_product_patch = (req, res, next) => {
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