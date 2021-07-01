const express = require('express');
const router = express.Router();

const DeliveryController = require('../controllers/delivery');
const checkAuth = require('../middleware/check-auth')

router.get('/get/delivery', DeliveryController.delivery_get_all)

router.post('/post/delivery', DeliveryController.delivery_create_delivery);

router.patch('/patch/id/:deliveryId', DeliveryController.get_delivery_by_id);

router.delete('/delete/id/:deliveryId', DeliveryController.delivery_delete_by_id);

module.exports = router;