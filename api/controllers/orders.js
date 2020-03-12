const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order.find()
       
        // To only fetch one thing from the product like name -> .populate('product', 'name') <-
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })

        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_date = (req, res, next) => {
    const date = req.query.date;
    const valmis = parseInt(req.query.valmis);
    Order.find()
        .populate('products')
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

exports.orders_create_order = (req, res, next) => {
    Product.find()
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                kauppa: req.body.kauppa,
                alisatieto: req.body.alisatieto,
                date: req.body.date,
                toimituspvm: req.body.toimituspvm,
                valmis: req.body.valmis,
                products: req.body.products
            });
            return order
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    id_: result._id,
                    kauppa: result.kauppa,
                    alisatieto: result.alisatieto,
                    date: result.date,
                    toimituspvm: result.toimituspvm,
                    valmis: result.valmis,
                    products: result.products
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('products')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_update_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.updateOne({ _id: id }, req.body, { new: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order updated',
                result: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + id
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

exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http:localhost:3000/orders/',
                    body: { productId: 'ID', quantity: 'Number' }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}