const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');
const roleAuth = require('../middleware/check-role');

router.get('/', checkAuth, ProductsController.products_get_all);

router.get('/tables', checkAuth, ProductsController.products_get_date);

router.post('/post', checkAuth,  ProductsController.products_create_product);

router.get('/get/id/:productId', checkAuth, ProductsController.products_get_product);

router.put('/put/id/:productId', checkAuth, ProductsController.products_update_product);

router.patch('/patch/id/:productId', checkAuth, ProductsController.products_update_product_patch);

router.delete('/delete/id/:productId', checkAuth, ProductsController.products_delete_product);

router.delete('/many/mult', checkAuth, ProductsController.products_delete_multiple_products);

module.exports = router;