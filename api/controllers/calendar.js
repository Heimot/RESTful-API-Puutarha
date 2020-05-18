const mongoose = require('mongoose');
const Calendar = require('../models/calendars');

exports.calendar_get_data = (req, res, next) => {
    Calendar.find()
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

exports.calendar_post_data = (req, res, next) => {
    const calendar = new Calendar({
        _id: req.body._id,
        info: req.body.info,
        keraysInfo: req.body.keraysInfo,
    });
    
    calendar
        .save()
        .then(result => {

            res.status(201).json({
                message: 'Added flowers successfully',
                createdInfo: {
                    _id: result._id,
                    info: result.info,
                    keraysInfo: result.keraysInfo,
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

exports.calendar_delete_data = (req, res, next) => {
    const id = req.params.calendarId;
    Calendar.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Calendar deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.calendar_update_data = (req, res, next) => {
    const id = req.params.calendarId;
    Calendar.updateOne({ _id: id }, req.body, { new: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Calendar updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.calendar_get_data_by_id = (req, res, next) => {
    const id = req.params.calendarId;
    Calendar.findById(id)
    .select('_id info keraysInfo')
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                calendar: doc
            });
        } else {
            res.status(404).json({ message: 'NoDataFound'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
}

exports.calendar_patch_data = (req, res, next) => {
    const id = req.params.calendarId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Calendar.update({ _id: id }, { $set: updateOps })
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