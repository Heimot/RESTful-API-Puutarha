const mongoose = require('mongoose');
const Item = require('../models/items');

exports.items_get_flowers = (req, res, next) => {
    Item.find()
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

exports.items_post_flowers = (req, res, next) => {
    const item = new Item({
        _id: "items",
        flowers: req.body.flowers,
        kaupat: req.body.kaupat
    });
    
    item
        .save()
        .then(result => {

            res.status(201).json({
                message: 'Added flowers successfully',
                createdProduct: {
                    flowers: result.flowers,
                    kaupat: result.kaupat,
                    _id: result._id
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

exports.items_delete_flowers = (req, res, next) => {
    const id = req.params.itemId;
    Item.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Item deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.items_update_flowers = (req, res, next) => {
    const id = req.params.itemId;
    Item.updateOne({ _id: id }, req.body, { new: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Item updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.items_get_flower_by_id = (req, res, next) => {
    const id = req.params.itemId;
    Item.findById(id)
    .select('kaupat flowers _id')
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                item: doc
            });
        } else {
            res.status(404).json({ message: 'Items has not been created'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
}

exports.items_patch_flowers = (req, res, next) => {
    const id = req.params.itemId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Item.update({ _id: id }, { $set: updateOps })
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