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

exports.products_get_date = (req, res, next) => {
    const date = req.query.date;
    const valmis = parseInt(req.query.valmis);
    Product.find()
        .exec()
        .then(docs => {
            if (date) {
                const result = docs.filter(function (docs) {
                    return docs.date === date;
                });

                if (valmis) {
                    const result2 = result.filter(function (results) {
                        return results.valmis === valmis;
                    });
                    res.status(200).json(result2);

                } else {
                    res.status(200).json(result);
                }

            } else {
                if (valmis) {
                    const result2 = docs.filter(function (docs) {
                        return docs.valmis === valmis;
                    });
                    res.status(200).json(result2);
                } else {
                    res.status(200).json(docs);
                }
            }
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
        kukka: req.body.kukka, 
        toimi: req.body.toimi,
        kerays: req.body.kerays,
        keratty: req.body.keratty,
        kerattymaara: req.body.kerattymaara,
        lisatieto: req.body.lisatieto,
        valmis: req.body.valmis
    });
    product
        .save()
        .then(result => {
            
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    kukka: result.kukka, 
                    toimi: result.toimi,
                    kerays: result.kerays,
                    keratty: result.keratty,
                    kerattymaara: result.kerattymaara,
                    lisatieto: result.lisatieto,
                    valmis: result.valmis,
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

// ADD IDS TO ARRAY AND .map() them and THEN DELETE THEM!
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

exports.products_delete_multiple_products = (req, res, next, _id) => {

    Product.deleteMany(
        {
            _id: { $in: (_id).map()}
    }
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Products deleted',
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