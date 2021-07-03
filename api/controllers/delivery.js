const mongoose = require('mongoose');
const Delivery = require("../models/delivery.js");

exports.delivery_get_all = (req, res, next) => {
  Delivery.findOne({isUsed: false})
    .select('_id deliveryId isUsed dateUsed')
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.delivery_create_delivery = (req, res, next) => {
  const delivery = new Delivery({
    _id: mongoose.Types.ObjectId(),
    deliveryId: req.body.deliveryId,
    isUsed: req.body.isUsed,
  });
  delivery
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created delivery successfully",
        createdDelivery: {
          deliveryId: result.deliveryId,
          isUsed: result.isUsed,
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.patch_delivery_by_id = (req, res, next) => {
    const id = req.params.deliveryId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Delivery.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'Delivery updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.delivery_delete_by_id = (req, res, next) => {
    const id = req.params.deliveryId;
    Delivery.remove({ _id: id })
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'Delivery deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}