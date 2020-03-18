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
        flowers: req.body.flowers,
    });
    item
        .save()
        .then(result => {

            res.status(201).json({
                message: 'Added flowers successfully',
                createdProduct: {
                    flowers: result.flowers,
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
    console.log(id)
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