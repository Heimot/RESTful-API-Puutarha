const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');
const Rullakot = require('../models/rullakko');
const Hyllyt = require('../models/hylly');

exports.orders_get_all = (req, res, next) => {
    Order.find()
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
    const valmis = req.query.valmis;
    const kerays = decodeURIComponent(req.query.kerays);
    const kauppa = decodeURIComponent(req.query.kauppa);
    const kukka = decodeURIComponent(req.query.kukka);

    Order.find()
        .populate('products rullakot hyllyt')
        .exec()
        .then(docs => {
            if (date) {
                const result = docs.filter(function (docs) {
                    return docs.date === date;
                });
                if (valmis) {

                    const result2 = result.map(doc => {
                        return {
                            _id: doc._id,
                            date: doc.date,
                            kauppa: doc.kauppa,
                            alisatieto: doc.alisatieto,
                            toimituspvm: doc.toimituspvm,
                            tuusjarvi: doc.tuusjarvi,
                            ryona: doc.ryona,
                            products: doc.products.filter(function (docs) {
                                return docs.valmis === valmis;
                            }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                            rullakot: doc.rullakot,
                            hyllyt: doc.hyllyt,
                            rekka: doc.rekka,
                            orderLisatieto: doc.orderLisatieto,
                        }
                    })


                    if (kerays === "") {
                        const result3 = result2.map(doc => {
                            return {
                                _id: doc._id,
                                date: doc.date,
                                kauppa: doc.kauppa,
                                alisatieto: doc.alisatieto,
                                toimituspvm: doc.toimituspvm,
                                tuusjarvi: doc.tuusjarvi,
                                ryona: doc.ryona,
                                products: doc.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                rullakot: doc.rullakot,
                                hyllyt: doc.hyllyt,
                                rekka: doc.rekka,
                                orderLisatieto: doc.orderLisatieto,
                            }
                        })
                        if (kauppa === "") {
                            const result4 = result3;
                            if (kukka === "") {
                                res.status(200).json({
                                    product: result4.map(doc => {
                                        return {
                                            _id: doc._id,
                                            date: doc.date,
                                            kauppa: doc.kauppa,
                                            alisatieto: doc.alisatieto,
                                            toimituspvm: doc.toimituspvm,
                                            tuusjarvi: doc.tuusjarvi,
                                            ryona: doc.ryona,
                                            products: doc.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                            rullakot: doc.rullakot,
                                            hyllyt: doc.hyllyt,
                                            rekka: doc.rekka,
                                            orderLisatieto: doc.orderLisatieto,
                                        }
                                    })
                                })
                            } else {
                                if (kukka) {
                                    res.status(200).json({
                                        product: result4.map(doc => {
                                            return {
                                                _id: doc._id,
                                                date: doc.date,
                                                kauppa: doc.kauppa,
                                                alisatieto: doc.alisatieto,
                                                toimituspvm: doc.toimituspvm,
                                                tuusjarvi: doc.tuusjarvi,
                                                ryona: doc.ryona,
                                                products: doc.products.filter(function (docs) {
                                                    return docs.kukka.toLowerCase().includes(kukka.toLowerCase());
                                                }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                                rullakot: doc.rullakot,
                                                hyllyt: doc.hyllyt,
                                                rekka: doc.rekka,
                                                orderLisatieto: doc.orderLisatieto,
                                            }
                                        })
                                    })
                                }
                            }
                        } else {
                            if (kauppa) {
                                const result4 = result3.filter(function (docs) {
                                    return docs.kauppa.toLowerCase().includes(kauppa.toLowerCase());
                                })
                                if (kukka === "") {
                                    res.status(200).json({
                                        product: result4.map(doc => {
                                            return {
                                                _id: doc._id,
                                                date: doc.date,
                                                kauppa: doc.kauppa,
                                                alisatieto: doc.alisatieto,
                                                toimituspvm: doc.toimituspvm,
                                                tuusjarvi: doc.tuusjarvi,
                                                ryona: doc.ryona,
                                                products: doc.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                                rullakot: doc.rullakot,
                                                hyllyt: doc.hyllyt,
                                                rekka: doc.rekka,
                                                orderLisatieto: doc.orderLisatieto,
                                            }
                                        })
                                    })
                                } else {
                                    if (kukka) {
                                        res.status(200).json({
                                            product: result4.map(doc => {
                                                return {
                                                    _id: doc._id,
                                                    date: doc.date,
                                                    kauppa: doc.kauppa,
                                                    alisatieto: doc.alisatieto,
                                                    toimituspvm: doc.toimituspvm,
                                                    tuusjarvi: doc.tuusjarvi,
                                                    ryona: doc.ryona,
                                                    products: doc.products.filter(function (docs) {
                                                        return docs.kukka.toLowerCase().includes(kukka.toLowerCase());
                                                    }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                                    rullakot: doc.rullakot,
                                                    hyllyt: doc.hyllyt,
                                                    rekka: doc.rekka,
                                                    orderLisatieto: doc.orderLisatieto,
                                                }
                                            })
                                        })
                                    }
                                }
                            }
                        }
                    } else {
                        result3 = result2.map(doc => {
                            return {
                                _id: doc._id,
                                date: doc.date,
                                kauppa: doc.kauppa,
                                alisatieto: doc.alisatieto,
                                toimituspvm: doc.toimituspvm,
                                tuusjarvi: doc.tuusjarvi,
                                ryona: doc.ryona,
                                products: doc.products.filter(function (docs) {
                                    return docs.kerays === kerays;
                                }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                rullakot: doc.rullakot,
                                hyllyt: doc.hyllyt,
                                rekka: doc.rekka,
                                orderLisatieto: doc.orderLisatieto,
                            }
                        })
                        if (kauppa === "") {
                            const result4 = result3;
                            if (kukka === "") {
                                res.status(200).json({
                                    product: result4.map(doc => {
                                        return {
                                            _id: doc._id,
                                            date: doc.date,
                                            kauppa: doc.kauppa,
                                            alisatieto: doc.alisatieto,
                                            toimituspvm: doc.toimituspvm,
                                            tuusjarvi: doc.tuusjarvi,
                                            ryona: doc.ryona,
                                            products: doc.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                            rullakot: doc.rullakot,
                                            hyllyt: doc.hyllyt,
                                            rekka: doc.rekka,
                                            orderLisatieto: doc.orderLisatieto,
                                        }
                                    })
                                })
                            } else {
                                if (kukka) {
                                    res.status(200).json({
                                        product: result4.map(doc => {
                                            return {
                                                _id: doc._id,
                                                date: doc.date,
                                                kauppa: doc.kauppa,
                                                alisatieto: doc.alisatieto,
                                                toimituspvm: doc.toimituspvm,
                                                tuusjarvi: doc.tuusjarvi,
                                                ryona: doc.ryona,
                                                products: doc.products.filter(function (docs) {
                                                    return docs.kukka.toLowerCase().includes(kukka.toLowerCase());
                                                }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                                rullakot: doc.rullakot,
                                                hyllyt: doc.hyllyt,
                                                rekka: doc.rekka,
                                                orderLisatieto: doc.orderLisatieto,
                                            }
                                        })
                                    })
                                }
                            }
                        } else {
                            if (kauppa) {
                                const result4 = result3.filter(function (docs) {
                                    return docs.kauppa.toLowerCase().includes(kauppa.toLowerCase());
                                })
                                if (kukka === "") {
                                    res.status(200).json({
                                        product: result4.map(doc => {
                                            return {
                                                _id: doc._id,
                                                date: doc.date,
                                                kauppa: doc.kauppa,
                                                alisatieto: doc.alisatieto,
                                                toimituspvm: doc.toimituspvm,
                                                tuusjarvi: doc.tuusjarvi,
                                                ryona: doc.ryona,
                                                products: doc.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                                rullakot: doc.rullakot,
                                                hyllyt: doc.hyllyt,
                                                rekka: doc.rekka,
                                                orderLisatieto: doc.orderLisatieto,
                                            }
                                        })
                                    })
                                } else {
                                    if (kukka) {
                                        res.status(200).json({
                                            product: result4.map(doc => {
                                                return {
                                                    _id: doc._id,
                                                    date: doc.date,
                                                    kauppa: doc.kauppa,
                                                    alisatieto: doc.alisatieto,
                                                    toimituspvm: doc.toimituspvm,
                                                    tuusjarvi: doc.tuusjarvi,
                                                    ryona: doc.ryona,
                                                    products: doc.products.filter(function (docs) {
                                                        return docs.kukka.toLowerCase().includes(kukka.toLowerCase());
                                                    }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                                    rullakot: doc.rullakot,
                                                    hyllyt: doc.hyllyt,
                                                    rekka: doc.rekka,
                                                    orderLisatieto: doc.orderLisatieto,
                                                }
                                            })
                                        })
                                    }
                                }
                            }
                        }
                    }

                } else {

                    if (kerays === "") {
                        res.status(200).json({
                            product: result.map(doc => {
                                return {
                                    _id: doc._id,
                                    date: doc.date,
                                    kauppa: doc.kauppa,
                                    alisatieto: doc.alisatieto,
                                    toimituspvm: doc.toimituspvm,
                                    tuusjarvi: doc.tuusjarvi,
                                    ryona: doc.ryona,
                                    products: doc.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                    rullakot: doc.rullakot,
                                    hyllyt: doc.hyllyt,
                                    rekka: doc.rekka,
                                    orderLisatieto: doc.orderLisatieto,
                                }
                            })
                        });
                    } else {
                        res.status(200).json({
                            product: result.map(doc => {
                                return {
                                    _id: doc._id,
                                    date: doc.date,
                                    kauppa: doc.kauppa,
                                    alisatieto: doc.alisatieto,
                                    toimituspvm: doc.toimituspvm,
                                    tuusjarvi: doc.tuusjarvi,
                                    ryona: doc.ryona,
                                    products: doc.products.filter(function (docs) {
                                        return docs.kerays === kerays;
                                    }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                    rullakot: doc.rullakot,
                                    hyllyt: doc.hyllyt,
                                    rekka: doc.rekka,
                                    orderLisatieto: doc.orderLisatieto,
                                }
                            })
                        });
                    }
                }
            } else {
                if (valmis) {
                    const result2 = docs.map(doc => {
                        return {
                            _id: doc._id,
                            date: doc.date,
                            kauppa: doc.kauppa,
                            alisatieto: doc.alisatieto,
                            toimituspvm: doc.toimituspvm,
                            tuusjarvi: doc.tuusjarvi,
                            ryona: doc.ryona,
                            products: doc.products.filter(function (docs) {
                                return docs.valmis === valmis;
                            }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                            rullakot: doc.rullakot,
                            hyllyt: doc.hyllyt,
                            rekka: doc.rekka,
                            orderLisatieto: doc.orderLisatieto,
                        }
                    })
                    if (kerays === "") {
                        res.status(200).json({
                            product: result2.map(doc => {
                                return {
                                    _id: doc._id,
                                    date: doc.date,
                                    kauppa: doc.kauppa,
                                    alisatieto: doc.alisatieto,
                                    toimituspvm: doc.toimituspvm,
                                    tuusjarvi: doc.tuusjarvi,
                                    ryona: doc.ryona,
                                    products: doc.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                    rullakot: doc.rullakot,
                                    hyllyt: doc.hyllyt,
                                    rekka: doc.rekka,
                                    orderLisatieto: doc.orderLisatieto,
                                }
                            })
                        });
                    } else {
                        res.status(200).json({
                            product: result2.map(doc => {
                                return {
                                    _id: doc._id,
                                    date: doc.date,
                                    kauppa: doc.kauppa,
                                    alisatieto: doc.alisatieto,
                                    toimituspvm: doc.toimituspvm,
                                    tuusjarvi: doc.tuusjarvi,
                                    ryona: doc.ryona,
                                    products: doc.products.filter(function (docs) {
                                        return docs.kerays === kerays;
                                    }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                    rullakot: doc.rullakot,
                                    hyllyt: doc.hyllyt,
                                    rekka: doc.rekka,
                                    orderLisatieto: doc.orderLisatieto,
                                }
                            })
                        });
                    }
                } else {
                    res.status(200).json({
                        product: docs.map(doc => {
                            return {
                                _id: doc._id,
                                date: doc.date,
                                kauppa: doc.kauppa,
                                alisatieto: doc.alisatieto,
                                toimituspvm: doc.toimituspvm,
                                tuusjarvi: doc.tuusjarvi,
                                ryona: doc.ryona,
                                products: doc.products.filter(function (docs) {
                                    return docs.kerays === kerays;
                                }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                                rullakot: doc.rullakot,
                                hyllyt: doc.hyllyt,
                                rekka: doc.rekka,
                                orderLisatieto: doc.orderLisatieto,
                            }
                        })
                    });
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
    Order.find()
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                kauppa: req.body.kauppa,
                alisatieto: req.body.alisatieto,
                date: req.body.date,
                toimituspvm: req.body.toimituspvm,
                tuusjarvi: req.body.tuusjarvi,
                ryona: req.body.ryona,
                products: req.body.products,
                rullakot: req.body.rullakot,
                hyllyt: req.body.hyllyt,
                rekka: req.body.rekka,
                orderLisatieto: req.body.orderLisatieto,
            });
            return order
                .save()
        })
        .then(result => {
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    kauppa: result.kauppa,
                    alisatieto: result.alisatieto,
                    date: result.date,
                    toimituspvm: result.toimituspvm,
                    tuusjarvi: result.tuusjarvi,
                    ryona: result.ryona,
                    products: result.products,
                    rullakot: result.rullakot,
                    hyllyt: result.hyllyt,
                    rekka: result.rekka,
                    orderLisatieto: result.orderLisatieto,
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

exports.orders_get_ids_to_remove = (req, res, next) => {
    Order.findById(req.params.orderId)
        .exec()
        .then(docs => {
            if (!docs) {
                res.status(404).json({
                    message: "Order not found"
                })
            }
            res.status(200).json({
                _id: docs._id,
                products: docs.products
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_calendar = (req, res, next) => {
    const date = req.query.date;
    const toimituspvm = req.query.toimitus;

    Order.find()
        .populate('rullakot', 'rullakoidenMaara')
        .exec()
        .then(docs => {
            if (date) {
                let result2 = docs.filter(function (docs) {
                    return docs.date === date;
                })
                res.status(200).json({
                    product: result2.map(doc => {
                        return {
                            _id: doc._id,
                            date: doc.date,
                            kauppa: doc.kauppa,
                            toimituspvm: doc.toimituspvm,
                            tuusjarvi: doc.tuusjarvi,
                            ryona: doc.ryona,
                            rullakot: doc.rullakot,
                            rekka: doc.rekka,
                            position: doc.position,
                            keraysPosition: doc.keraysPosition,
                        }
                    })
                });
            } else {
                let result = docs.filter(function (docs) {
                    return docs.toimituspvm === toimituspvm;
                })
                res.status(200).json({
                    product: result.map(doc => {
                        return {
                            _id: doc._id,
                            date: doc.date,
                            kauppa: doc.kauppa,
                            toimituspvm: doc.toimituspvm,
                            tuusjarvi: doc.tuusjarvi,
                            ryona: doc.ryona,
                            rullakot: doc.rullakot,
                            rekka: doc.rekka,
                            position: doc.position,
                            keraysPosition: doc.keraysPosition,
                        }
                    })

                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_order = (req, res, next) => {
    const paikka = decodeURIComponent(req.query.paikka);
    const kukka = decodeURIComponent(req.query.kukka);
    const valmius = req.query.valmis;
    Order.findById(req.params.orderId)
        .populate('products rullakot hyllyt')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            if (paikka && valmius && kukka === "") {
                res.status(200).json({
                    _id: order._id,
                    date: order.date,
                    kauppa: order.kauppa,
                    alisatieto: order.alisatieto,
                    toimituspvm: order.toimituspvm,
                    tuusjarvi: order.tuusjarvi,
                    ryona: order.ryona,
                    products: order.products.filter(doc => {
                        return doc.kerays === paikka
                    }).filter(docs => {
                        return docs.valmis === valmius
                    }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                    rullakot: order.rullakot,
                    hyllyt: order.hyllyt,
                    rekka: order.rekka,
                    orderLisatieto: order.orderLisatieto,
                })
            } else if (paikka && valmius && kukka) {
                res.status(200).json({
                    _id: order._id,
                    date: order.date,
                    kauppa: order.kauppa,
                    alisatieto: order.alisatieto,
                    toimituspvm: order.toimituspvm,
                    tuusjarvi: order.tuusjarvi,
                    ryona: order.ryona,
                    products: order.products.filter(doc => {
                        return doc.kerays === paikka
                    }).filter(docs => {
                        return docs.valmis === valmius
                    }).filter(docs => {
                        return docs.kukka.toLowerCase().includes(kukka.toLowerCase());
                    }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                    rullakot: order.rullakot,
                    hyllyt: order.hyllyt,
                    rekka: order.rekka,
                    orderLisatieto: order.orderLisatieto,
                })
            } else if (paikka === "" && valmius && kukka) {
                res.status(200).json({
                    _id: order._id,
                    date: order.date,
                    kauppa: order.kauppa,
                    alisatieto: order.alisatieto,
                    toimituspvm: order.toimituspvm,
                    tuusjarvi: order.tuusjarvi,
                    ryona: order.ryona,
                    products: order.products.filter(docs => {
                        return docs.valmis === valmius
                    }).filter(docs => {
                        return docs.kukka.toLowerCase().includes(kukka.toLowerCase());
                    }).sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                    rullakot: order.rullakot,
                    hyllyt: order.hyllyt,
                    rekka: order.rekka,
                    orderLisatieto: order.orderLisatieto,
                })
            } else {
                res.status(200).json({
                    _id: order._id,
                    date: order.date,
                    kauppa: order.kauppa,
                    alisatieto: order.alisatieto,
                    toimituspvm: order.toimituspvm,
                    tuusjarvi: order.tuusjarvi,
                    ryona: order.ryona,
                    products: order.products.sort((a, b) => { return a.kukka.localeCompare(b.kukka) }),
                    rullakot: order.rullakot,
                    hyllyt: order.hyllyt,
                    rekka: order.rekka,
                    orderLisatieto: order.orderLisatieto,
                })
            }
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

exports.orders_update_order_patch = (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Order.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Order updated',
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
                    type: 'DELETE',
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