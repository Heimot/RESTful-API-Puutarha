const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const roleAuth = require('../middleware/check-role');

const ordersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get('/', checkAuth, ordersController.orders_get_all);

router.get('/tables', checkAuth, ordersController.orders_get_date);

router.post('/post/', checkAuth, ordersController.orders_create_order);

router.get('/get/id/:orderId', checkAuth, ordersController.orders_get_order);

router.put('/put/id/:orderId', checkAuth, ordersController.orders_update_order);

router.delete('/delete/id/:orderId', checkAuth, ordersController.orders_delete_order);

module.exports = router;